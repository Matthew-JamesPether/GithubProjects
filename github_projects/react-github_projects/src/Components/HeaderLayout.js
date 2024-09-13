// Imports the necessary files
import { React } from "react";
import SearchBarLayout from "./SearchBarLayout";
import "./Styles/HeaderLayout.css";

// A function that displays the appropriate header for a user
const HeaderLayout = (props) => {
  // Returns the header container
  return (
    <header className="header-container">
      <div className="heading">{props.heading}</div>
      <SearchBarLayout setUser={props.setUser} setIsLoading={props.setIsLoading}/>
    </header>
  );
}

// Declares the HeaderLayout function as the default component from this module
export default HeaderLayout;
