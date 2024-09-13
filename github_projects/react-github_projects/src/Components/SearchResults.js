// Imports the necessary files
import { React } from "react";
import Spinner from "react-bootstrap/Spinner";

// A function that displays the appropriate SearchResults for a user
const SearchResults = (props) => {
  // A function that fetches data about the selected user and sets the state value
  const handleClick = (user) => {
    // Sets the state variables to empty and to true
    props.setIsLoading(true);
    props.setInput("");
    props.setResults([]);

    console.log(props.results);

    // Fetches the data from the selected user and stores it in a state
    fetch(`http://localhost:8080/gitprojects/user/${user}`)
      .then((response) => response.json())
      .then((data) => {
        props.setUser(data);
        props.setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching usernames:", error));
  };

  // Returns the SearchResults container
  return (
    <div className="search-results-container">
      {/* Displays a loading animation if state is set to true */}
      {props.isLoading ? (
        <div className="loading" style={{ textAlign: "center" }}>
          <Spinner animation="border" />
          <p>Loading...</p>
        </div>
      ) : (
        // Else loops through the results state and displays its content
        props.results.map((result) => {
          return (
            <div
              className="user-list"
              key={result.id}
              onClick={(e) => handleClick(result.login)}
            >
              {result.login}
            </div>
          );
        })
      )}
    </div>
  );
};

// Declares the SearchResults function as the default component from this module
export default SearchResults;
