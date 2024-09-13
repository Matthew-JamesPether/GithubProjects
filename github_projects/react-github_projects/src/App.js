// Imports the necessary files
import "./App.css";
import { React, useEffect, useState } from "react";
import HeaderLayout from "./Components/HeaderLayout";
import ReposLayout from "./Components/ReposLayout";
import ProfileLayout from "./Components/ProfileLayout";
import BioLayout from "./Components/BioLayout";
import Spinner from "react-bootstrap/Spinner";

// A function that calls the appropriate components and displays them
const App = () => {
  // Declares a state variable
  const [layout, setLayout] = useState("");
  const [userData, setUser] = useState([]);
  const [repoData, setRepoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRepo, setLoadingRepo] = useState(false);

  // Uses useEffect to check whether there is any user data and renders the bio layout
  useEffect(() => {
    if (userData.length !== 0) {
      setLayout("BioLayout");
    }
  }, [userData]);

  // Returns the appropriate components
  return (
    <div className="App">
      <HeaderLayout
        heading={"GITHUB PROJECTS"}
        setUser={setUser}
        setIsLoading={setIsLoading}
      />

      {/* Displays a loading animation if state is set to true */}
      {isLoading && (
        <div className="app-loading" style={{ textAlign: "center" }}>
          <Spinner animation="border" />
          <p>Loading...</p>
        </div>
      )}

      <div className="content">
        {/* Displays the profile layout if there is any user data */}
        {userData.length !== 0 && (
          <ProfileLayout
            userData={userData}
            setLayout={setLayout}
            setRepoData={setRepoData}
            setLoadingRepo={setLoadingRepo}
          />
        )}

        {/* Displays a loading animation if state is set to true */}
        {loadingRepo ? (
          <div className="repo-loading" style={{ textAlign: "center" }}>
            <Spinner animation="border" />
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {/* Statements that Display the appropriate layout */}
            {layout === "BioLayout" && userData.length !== 0 && (
              <BioLayout userInfo={userData["userInfo"]} />
            )}
            {layout === "ReposLayout" && userData.length !== 0 && (
              <ReposLayout loadingRepo={loadingRepo} repoData={repoData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Declares the App function as the default component from this module
export default App;
