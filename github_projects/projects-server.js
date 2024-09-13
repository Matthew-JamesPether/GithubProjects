// Imports the necessary files
import "isomorphic-fetch";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { Octokit } from "octokit";
import "dotenv/config";

// Declares global variables
const app = express();

// Uses the specific functions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Authorizes GitHub's Octokit package with a github token
const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY
});

// A function that searches for users that have the given string in there username
const searchUser = async (username) => {
  // Fetches users using octokit and a github api
  const users = await octokit.request("GET /search/users", {
    q: username,
    login: username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  // Stores the users login in detail and ID as an object
  const loginId = users["data"]["items"].map((user) => {
    return { login: `${user.login}`, id: user.id };
  });

  // Returns the array
  return loginId;
};

// A function that gets the users info
const getUserInfo = async (username) => {
  // Fetches users info using octokit and a github api
  const userData = await octokit.request("GET /users/{user}", {
    user: username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  // Fetches users repos using octokit and a github api
  const reposData = await octokit.request("GET /users/{user}/repos", {
    user: username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  // Stores the necessary user info as an object
  const userInfo = Object.assign(
    {},
    {
      id: userData["data"].id,
      login: userData["data"].login,
      name: userData["data"].name,
      avatar_url: userData["data"].avatar_url,
      location: userData["data"].location,
      email: userData["data"].email,
      bio: userData["data"].bio,
      public_repos: userData["data"].public_repos,
      created_at: userData["data"].created_at.split('T')[0]
    }
  );
  // Stores the necessary repos info as an array
  const reposInfo = reposData["data"].map((repo) => {
    return {
      id: repo.id,
      name: `${repo.name}`,
      created_at: `${repo.created_at.split('T')[0]}`,
    };
  });

  // Returns the users info and repos info as an object
  return { userInfo: userInfo, reposInfo: reposInfo };
};

// A function that gets the cars from the json file
const getUserRepo = async (username, repoName) => {
  // Fetches users repo data using octokit and a github api
  const repoData = await octokit.request("GET /repos/{user}/{repo}", {
    user: username,
    repo: repoName,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  // Fetches users repo commits using octokit and a github api
  const commitsData = await octokit.request(
    "GET /repos/{user}/{repo}/commits",
    {
      user: username,
      repo: repoName,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  // Creates a new object with the necessary data for user info
  const userInfo = Object.assign(
    {},
    {
      id: repoData["data"].id,
      name: repoData["data"].name,
      created_at: repoData["data"].created_at.split('T')[0],
      description: repoData["data"].description,
    }
  );

  // Creates a new object with the necessary data for commits info
  const commitsInfo = commitsData["data"]
    .map((commitData) => {
      return {
        author: commitData.commit.author.name,
        message: commitData.commit.message,
        date: commitData.commit.author.date.split('T')[0],
      };
    })
    .slice(0, 5);

  // Returns the users info and commits info as an object
  return { commitsInfo: commitsInfo, userInfo: userInfo };
};

// Responds with the usernames array when the user visits the URL
app.get("/gitprojects/search/:username", async (req, resp) => {
  const username = req.params.username;
  const usernames = await searchUser(username);

  resp.send(usernames);
});

// Responds with the users info object when the user visits the URL
app.get("/gitprojects/user/:username", async (req, resp) => {
  const gitHubUser = req.params.username;
  const userInfo = await getUserInfo(gitHubUser);

  resp.send(userInfo);
});

// Responds with the repo object when the user visits the URL
app.get("/gitprojects/repo/:username/:repo", async (req, resp) => {
  const gitHubUser = req.params.username;
  const gitHubRepo = req.params.repo;

  const repo = await getUserRepo(gitHubUser, gitHubRepo);
  resp.send(repo);
});

// Server is listening to the port
app.listen(process.env.PORT || 8080, () => console.log("Listening engaged"));
