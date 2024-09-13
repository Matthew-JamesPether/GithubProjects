// Imports the necessary files
import { React, useState } from "react";
import "./Styles/SearchBarLayout.css";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

// A function that displays the appropriate SearchBarLayout for a user
const SearchBarLayout = (props) => {
  // Declares state variables
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Returns the SearchBarLayout container
  return (
    <div className="searchBar-layout-container">
      <SearchBar
        input={input}
        setInput={setInput}
        setResults={setResults}
        setIsLoading={setIsLoading}
      />
      {/* Displays component if input has a value */}
      {input !== "" && (
        <SearchResults
          isLoading={isLoading}
          setResults={setResults}
          setInput={setInput}
          results={results}
          setUser={props.setUser}
          setIsLoading={props.setIsLoading}
        />
      )}
    </div>
  );
};

// Declares the SearchBarLayout function as the default component from this module
export default SearchBarLayout;
