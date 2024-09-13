// Imports the necessary files
import { React } from "react";
import "./Styles/ReposLayout.css";

// A function that displays the appropriate ReposLayout for a user
const ReposLayout = (props) => {
  // Declares variables to separate the data
  const userInfo = props.repoData["userInfo"];
  const commitsInfo = props.repoData["commitsInfo"];

  // Returns the ReposLayout container
  return (
    <div className="repos-layout-container">
      <h3>{userInfo.name}</h3>
      <p>
        Last committed on: <span>{commitsInfo[0].date}</span>
      </p>
      <p>
        Created at: <span>{userInfo.created_at}</span>
      </p>
      <p>
        Description:{" "}
        <span>
          {userInfo.description === null
            ? "No description was found"
            : userInfo.description}
        </span>
      </p>
      <p>last 5 commits: </p>

      {/* Loops though the array and displays its variables */}
      <div className="commits-container">
        {commitsInfo.map((commit, index) => {
          // Returns a container that displays each commit
          return (
            <div key={index} className="commits">
              <p>
                Committed by: <span>{commit.author}</span>
              </p>
              <p>
                Committed on: <span>{commit.date}</span>
              </p>
              <p>
                Commit description: <span>{commit.message}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Declares the ReposLayout function as the default component from this module
export default ReposLayout;
