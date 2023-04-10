import * as VerificationPrompt from "@/ai/prompts/Verification.Prompt";
import { ChatCompletionRequestMessage } from "openai";
import { generateChatCompletion } from "@/lib/ChatCompletion";
import Link from "next/link";
import Chat from "@/components/Chat";

// Force dynamic is required to use URLSearchParams 
// otherwise it will cache my new rule since i'm sending it as a GET param 
export const dynamic = "force-dynamic";
export default async function Home({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  if (
    "action" in searchParams &&
    "role" in searchParams &&
    "username" in searchParams &&
    searchParams["username"] !== ""
  ) {
    const action = searchParams.action as string;
    const username = searchParams.username as string;
    const role = searchParams.role as string;
    const input: VerificationPrompt.Input = {
      action,
      username,
      role,
    };
    const messages: ChatCompletionRequestMessage[] = [
      { role: "system", content: process.env.VerificationPrompt as string },
      { role: "user", content: JSON.stringify(input) },
    ];

    const res = await generateChatCompletion(messages);

    return (
        <Chat messages={[...messages, { role: "assistant", content: JSON.stringify(res) }]} />
    );
  }
  const isInvalidUsername =
    "username" in searchParams && searchParams["username"] === "";

  return (
      <div className="m-10 grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
          <form>
            <label htmlFor="username">Username:</label>
            <br />
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              className={`input input-bordered w-full max-w-xs text-white ${
                isInvalidUsername ? "input-error" : ""
              }`}
            />
            <br />
            <label htmlFor="role">Role:</label>
            <br />
            <select id="role" name="role" className="select w-full max-w-xs text-white">
              <option value="public">Public</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <br />
            <label htmlFor="action">Action:</label>
            <br />
            <select
              id="action"
              name="action"
              className="select w-full max-w-xs text-white"
            >
              <option value="confidential">View Confidential File</option>
              <option value="public">View Public File</option>
              <option value="employees_only">View Employees Only File</option>
            </select>
            <br />
            <br />
            <button className="btn " type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Link href="/admin">
            <h1 className="text-2xl font-bold text-gray-700">Edit Rules</h1>
            <p className="text-gray-700">Here you can modify the access control rules using natural language and we will submit a PR to github.</p>
            <br />
            <button className="btn btn-primary" type="submit">
              Login as Admin
            </button>
          </Link>
        </div>
      </div>
  );
}
