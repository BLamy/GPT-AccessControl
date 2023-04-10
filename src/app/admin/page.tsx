import adminLog from "@/ai/generated/AdminLogs";
import { generateChatCompletion } from "@/lib/ChatCompletion";
import { ChatCompletionRequestMessage } from "openai";
import Chat from "@/components/Chat";
import { createPullRequest } from "@/lib/Github";
import chalk from "chalk";

// Force dynamic is required to use URLSearchParams 
// otherwise it will cache my new rule since i'm sending it as a GET param 
export const dynamic = "force-dynamic";
export default async function Admin({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  let messages: ChatCompletionRequestMessage[] = [...adminLog];
  let prLink = <></>;
  if ("new" in searchParams) {
    const naturalLangaugeQuery = searchParams.new as string;
    messages.push({ role: "user", content: naturalLangaugeQuery });
    console.log(chalk.blue(`USER: ${naturalLangaugeQuery}`));
    const res = await generateChatCompletion(messages, {
      parseResponse: false,
    });
    messages.push({ role: "assistant", content: res as string });
    console.log(chalk.gray(`ASSISTANT: ${res}`));

    if (typeof res !== "string") {
      const err = "Error: AI returned invalid response";
      console.log(chalk.gray(`ERROR: ${err}`));
      return err;
    }
    const match = res.match(/```json((.|\n)*?)```/);
    if (!match || match.length < 2) {
      const err = "Error: AI created no new rules";
      console.log(chalk.gray(`ERROR: ${err}`));
      return err;
    }

    const newLogs = JSON.stringify(messages, null, 2);
    const newRules = JSON.stringify(JSON.parse(match[1]), null, 2);

    const pr = await createPullRequest(naturalLangaugeQuery, newLogs, newRules);
    console.log(chalk.green(`PR: ${pr?.data.html_url}`));
    prLink = (
      <p>
        PR created: <a href={pr?.data.html_url}>{pr?.data.html_url}</a>
      </p>
    );
  }
  return (
    <div className="w-full h-full flex flex-col justify-end">
      <Chat messages={messages} />
      <form 
          action="/admin"
          method="GET"
          className="flex justify-between items-center"
        >
        <input
          id="new"
          name="new"
          type="text"
          placeholder="Describe your rule change here..."
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg mr-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
      {prLink}
    </div>
  );
}
