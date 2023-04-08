import rules from '@/ai/generated/Rules';
import adminLog from '@/ai/generated/AdminLogs';
import CodeCollapsible from '@/components/CodeCollapsible';
import { generateChatCompletion } from "@/lib/ChatCompletion";
import { ChatCompletionRequestMessage } from "openai";

const { Octokit } = require("@octokit/rest");

const token = process.env.GITHUB_API_TOKEN;
const owner = "blamy";
const repo = "GPT-AccessControl";
const branch = "main";
const logsFilePath = "src/ai/generated/AdminLogs.ts";
const rulesFilePath = "src/ai/generated/Rules.ts";
// const commitMessage = "Should just be the natural language query"; 
const newBranchName = "your-new-branch";
// const prTitle = "Your PR title";
// const prBody = "Should just be the natural language query"; 

// const octokit = new Octokit({ auth: token });

// async function editFilesAndCreatePR(newLogs: string, newRules: string) {
//   try {
//     // Get the reference of the base branch
//     const { data: baseRef } = await octokit.git.getRef({ owner, repo, ref: `heads/${branch}` });

//     // Create a new branch
//     await octokit.git.createRef({ owner, repo, ref: `refs/heads/${newBranchName}`, sha: baseRef.object.sha });

//     // Function to get updated file content
//     const getUpdatedFileContent = async (filePath: string, newContent: string) => {
//       const file = await octokit.repos.getContent({ owner, repo, path: filePath, ref: branch });
//       return {
//         path: filePath,
//         content: Buffer.from(newContent).toString("base64"),
//         mode: "100644", // File mode for a regular file
//         sha: file.data.sha,
//       };
//     };

//     // Get the updated file contents
//     const updatedLogsFile = await getUpdatedFileContent(logsFilePath, newLogs);
//     const updatedRulesFile = await getUpdatedFileContent(rulesFilePath, newRules);

//     // Get the current commit
//     const { data: currentCommit } = await octokit.git.getCommit({ owner, repo, commit_sha: baseRef.object.sha });

//     // Create a new tree with the updated files
//     const { data: newTree } = await octokit.git.createTree({
//       owner,
//       repo,
//       base_tree: currentCommit.tree.sha,
//       tree: [updatedLogsFile, updatedRulesFile],
//     });

//     // Create a new commit with the updated tree
//     const { data: newCommit } = await octokit.git.createCommit({
//       owner,
//       repo,
//       message: commitMessage,
//       tree: newTree.sha,
//       parents: [currentCommit.sha],
//     });

//     // Update the new branch to point to the new commit
//     await octokit.git.updateRef({
//       owner,
//       repo,
//       ref: `heads/${newBranchName}`,
//       sha: newCommit.sha,
//     });

//     // Create a pull request
//     await octokit.pulls.create({
//       owner,
//       repo,
//       title: prTitle,
//       head: newBranchName,
//       base: branch,
//       body: prBody,
//     });

//     console.log("Pull request created successfully!");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

export default async function Admin({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  if ("new" in searchParams) {
    const naturalLangaugeQuery = searchParams.new as string;
    let messages: ChatCompletionRequestMessage[] = [...adminLog, { role: "user", content: naturalLangaugeQuery }];
    const res = await generateChatCompletion(messages, { parseResponse: false });
    const newRules = JSON.stringify(res).match(/```json(.*)```/);
    if (!newRules || newRules.length < 2) {
      return "Error: AI created no new rules";
    }
    
    // TODO submit a PR to Github to update @/ai/generated/Rules.ts and @/ai/generated/AdminLogs.ts
    return <div>
      <h1>Here are the new rules</h1>
      <CodeCollapsible color="green" title="New Rules" code={newRules[1].replaceAll("\\n", '')} />
    </div>
  }
  return <div>
    <h1>Welcome to the admin panel</h1>
    <p>Here you can modify the access control rules using natural language and we will submit a PR to github.</p>
    <CodeCollapsible color="green" title="Current Rules" code={JSON.stringify(rules, null, 2)} />
    <form action="/admin" method="GET">
      <input type="text" id="new" name="new" />
      <button type="submit">Submit</button>
    </form>
  </div>
}
  