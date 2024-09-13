// Imports the necessary files
import { React } from "react";
import "./Styles/BioLayout.css";

// A function that displays the appropriate BioLayout for a user
const BioLayout = (props) => {
  // Returns the BioLayout container and the users info
  return (
    <div className="bio-layout-container">
      <h1>Bio of {props.userInfo["login"]}</h1>
      <p>
        Name:{" "}
        <span>
          {props.userInfo["name"] === null
            ? "No name was found"
            : props.userInfo["name"]}
        </span>
      </p>
      <p>
        <span>
          {props.userInfo["bio"] === null
            ? "No boi was found."
            : props.userInfo["bio"]}
        </span>
      </p>
      <p>
        Joined GitHub: <span>{props.userInfo["created_at"]}</span>
      </p>
      <p>
        Email:{" "}
        <span>
          {props.userInfo["email"] === null
            ? "email not found."
            : props.userInfo["email"]}
        </span>
      </p>
      <p>
        Location:{" "}
        <span>
          {props.userInfo["location"] === null
            ? "location not found."
            : props.userInfo["location"]}
        </span>
      </p>
      <p>
        Total Repos:{" "}
        <span>
          {props.userInfo["public_repos"] === null
            ? "No repos found."
            : props.userInfo["public_repos"]}
        </span>
      </p>
    </div>
  );
};

// Declares the BioLayout function as the default component from this module
export default BioLayout;
