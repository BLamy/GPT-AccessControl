import adminLog from '@/ai/generated/AdminLogs';
import { generateChatCompletion } from "@/lib/ChatCompletion";
import { ChatCompletionRequestMessage } from "openai";
import Chat from "@/components/Chat";
import { createPullRequest } from "@/lib/Github";

export default async function Admin({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  let messages: ChatCompletionRequestMessage[] = [...adminLog];
  let prLink = <></>;
  if ("new" in searchParams) {
    const naturalLangaugeQuery = searchParams.new as string;
    messages.push({ role: "user", content: naturalLangaugeQuery })
    const res = await generateChatCompletion(messages, { parseResponse: false });
    if (typeof res !== "string") {
      return "Error: AI returned invalid response";
    }
    const match = res.match(/```json(.*)```/);
    if (!match || match.length < 2) {
      return "Error: AI created no new rules";
    }
    messages.push({ role: "assistant", content: res as string })

    const newLogs = JSON.stringify(messages, null, 2);
    const newRules = JSON.stringify(JSON.parse(match[1]), null, 2);

    const pr = await createPullRequest(naturalLangaugeQuery, newLogs, newRules);
    prLink = <p>PR created: <a href={pr?.data.url}>{pr?.data.url}</a></p>
  }
  return <div>
    <Chat messages={messages} />
    {prLink}
    <form action="/admin" method="GET">
      <input type="text" id="new" name="new" />
      <button type="submit">Submit</button>
    </form>
  </div>
}
  