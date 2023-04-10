const { Octokit } = require("@octokit/core");
const { createPullRequest } = require("octokit-plugin-create-pull-request");
// require('dotenv')
function commitTitleToBranchName(commitTitle) {
    const branchName = commitTitle
      .toLowerCase()                     // Convert to lowercase
      .replace(/[^\w\s-]/g, '')          // Remove special characters except hyphens
      .replace(/[\s]+/g, '-')            // Replace spaces with hyphens
      .replace(/^-+|-+$/g, '');          // Remove leading and trailing hyphens
  
    return branchName;
  }
(async () => {
const token = process.env.GITHUB_API_KEY;
const owner = "blamy";
const repo = "GPT-AccessControl";
const branch = "main";
const logsFilePath = "src/ai/generated/AdminLogs.ts";
const rulesFilePath = "src/ai/generated/Rules.ts";
// const commitMessage = "Should just be the natural language query"; 
const newBranchName = "your-new-branch";
// const prTitle = "Your PR title";
// const prBody = "Should just be the natural language query"; 
// await new Promise((resolve, ) => setTimeout(resolve, 5000))// for quokka

// Returns a normal Octokit PR response
// See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
octokit
  .createPullRequest({
    owner: "blamy",
    repo: "GPT-AccessControl",
    title: "pull request title",
    body: "pull request description",
    head: "pull-request-branch-name",
    base: "main" /* optional: defaults to default branch */,
    update: false /* optional: set to `true` to enable updating existing pull requests */,
    forceFork: false /* optional: force creating fork even when user has write rights */,
    changes: [
      {
        /* optional: if `files` is not passed, an empty commit is created instead */
        files: {
          "path/to/file1.txt": "Content for file1",
          "path/to/file2.png": {
            content: "_base64_encoded_content_",
            encoding: "base64",
          },
        },
        commit:
          "creating file1.txt, file2.png, deleting file3.txt, updating file4.txt (if it exists), file5.sh",
      },
    ],
  })
  .then((pr) => console.log(pr.data.number));
})();