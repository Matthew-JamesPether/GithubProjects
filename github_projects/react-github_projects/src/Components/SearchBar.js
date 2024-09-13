// Imports the necessary files
import { React, useRef, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

// A function that displays the appropriate SearchBar for a user
const SearchBar = (props) => {
  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    // Cleanup function when component unmounts
    return () => {
      controllerRef.current.abort(); // Abort any ongoing requests
    };
  }, []);

  // A function that fetches data of users base on the value entered
  const fetchData = (value) => {
    // Abort the previous fetch request
    controllerRef.current.abort();
    // Create a new AbortController for the new request
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    // Fetches data and stores it in a state
    fetch(`http://localhost:8080/gitprojects/search/${value}`, { signal })
      .then((response) => response.json())
      .then((data) => {
        props.setResults(data);
        props.setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching usernames:", error);
        }
      });
  };

  // A function that sets the state value and calls the fetch function
  const handleChange = (value) => {
    props.setIsLoading(true);
    fetchData(value);
    props.setInput(value);
  };

  // Returns the SearchBar container
  return (
    <div className="searchbar-container">
      <input
        placeholder="Type to search..."
        value={props.input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {/* Uses react bootstrap search icon */}
      <BsSearch className="search-icon" />
    </div>
  );
};

// Declares the SearchBar function as the default component from this module
export default SearchBar;
