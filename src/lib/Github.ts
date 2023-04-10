import { Octokit } from "@octokit/core";
import { createPullRequest as prPlugin } from "octokit-plugin-create-pull-request";
const MyOctokit = Octokit.plugin(prPlugin);

const octokit = new MyOctokit({
  auth: process.env.GITHUB_API_KEY,
});

function commitTitleToBranchName(title: string) {
  const branchName = title
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, "") // Remove special characters except hyphens
    .replace(/[\s]+/g, "-") // Replace spaces with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  return branchName + "-" + timestamp;
}

export const createPullRequest = (
  title: string,
  adminLogs: string,
  rules: string
) =>
  octokit.createPullRequest({
    owner: "blamy",
    repo: "GPT-AccessControl",
    base: "main",
    head: commitTitleToBranchName(title.slice(0, 50)),
    title: title.slice(0, 50),
    body: title,
    changes: [
      {
        commit: title.slice(0, 50),
        files: {
          "src/ai/generated/AdminLogs.ts": `export default ${adminLogs} as const;`,
          "src/ai/generated/Rules.ts": `export default ${rules} as const;`,
        },
      },
    ],
  });
