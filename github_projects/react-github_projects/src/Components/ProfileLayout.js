// Imports the necessary files
import { React } from "react";
import RepoButton from "./RepoButton";
import "./Styles/ProfileLayout.css";

// A function that displays the appropriate Profile for a user
const ProfileLayout = (props) => {
  // A function that handles the profile buttons when clicked
  const handleClick = async (layout, data) => {
    // Fetches repo data when layout is set to 'RepoLayout'
    if (layout === "ReposLayout") {
      // Sets loading to true
      props.setLoadingRepo(true);

      // Fetches data and sets it to a state
      await fetch(
        `http://localhost:8080/gitprojects/repo/${data["user"]}/${data["repo"]}`
      )
        .then((response) => response.json())
        .then((data) => {
          props.setRepoData(data);
          props.setLoadingRepo(false);
        })
        .catch((error) => console.error("Error fetching usernames:", error));

      // Sets the layout state to equal 'RepoLayout'
      props.setLayout(layout);
    } else {
      // Set the layout state to equal the given parameter
      props.setLayout(layout);
    }
  };

  // Returns the ProfileLayout container
  return (
    <div className="profile-container">
      {/* Displays users profile picture and username*/}
      <img
        src={props.userData["userInfo"]["avatar_url"]}
        alt={"A picture of user " + props.userData["userInfo"]["login"]}
      />
      <h2>{props.userData["userInfo"]["login"]}</h2>

      {/* Displays a button to set the bio layout */}
      <div className="bio-button" onClick={(e) => handleClick("BioLayout", {})}>
        Back to Bio
      </div>
      {/* Displays all the repos as buttons */}
      <div className="repo-buttons-container">
        <p>Repos:</p>
        {props.userData["reposInfo"].map((repo) => {
          return (
            <RepoButton
              key={repo.id}
              repo={repo}
              handleClick={handleClick}
              user={props.userData["userInfo"]["login"]}
            />
          );
        })}
      </div>
    </div>
  );
};

// Declares the ProfileLayout function as the default component from this module
export default ProfileLayout;
