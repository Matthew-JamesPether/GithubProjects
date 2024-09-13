// Imports the necessary files
import { React } from "react";
import "./Styles/RepoButton.css";

// A function that displays the appropriate RepoButton for a user
const RepoButton = (props) => {

  // Returns the RepoButton container
  return (
    <div
      className="repo-button"
      onClick={(e) => props.handleClick("ReposLayout", {user: props.user, repo: props.repo["name"]})}
    >
      {props.repo["name"]}
    </div>
  );
};

// Declares the RepoButton function as the default component from this module
export default RepoButton;
