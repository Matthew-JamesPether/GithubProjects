// Imports files
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../Components/SearchBar";

// Describes which type of tests will be run for the SearchBar component
describe("SearchBar component", () => {
  // Mock props to simulate parent component functionality
  const setResults = jest.fn();
  const setIsLoading = jest.fn();
  const setInput = jest.fn();

  // Resets the mock function
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("Test if the fetch function is displaying the typed input", async () => {
    // Mock successful fetch response
    fetch.mockResponseOnce(
      JSON.stringify([{ username: "john_doe", project: "SampleProject" }])
    );

    // Render the SearchBar component
    const { getByPlaceholderText } = render(
      <SearchBar
        input=""
        setInput={setInput}
        setResults={setResults}
        setIsLoading={setIsLoading}
      />
    );

    // Simulate typing into the search bar
    const searchInput = getByPlaceholderText("Type to search...");
    fireEvent.change(searchInput, { target: { value: "john" } });

    // Verify loading state is set to true initially
    expect(setIsLoading).toHaveBeenCalledWith(true);

    // Wait for the fetch to be called and resolved
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8080/gitprojects/search/john",
        expect.any(Object)
      );
    });

    // Verify that setResults was called with the fetched data
    await waitFor(() => {
      expect(setResults).toHaveBeenCalledWith([
        { username: "john_doe", project: "SampleProject" },
      ]);
    });

    // Verify loading state is set to false after fetch
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  test("Tests if the fetch gets aborted when new input is entered", async () => {
    // Mock fetch to simulate abort error
    fetch.mockAbortOnce();

    const { getByPlaceholderText } = render(
      <SearchBar
        input=""
        setInput={setInput}
        setResults={setResults}
        setIsLoading={setIsLoading}
      />
    );

    // Simulate typing into the search bar
    const searchInput = getByPlaceholderText("Type to search...");
    fireEvent.change(searchInput, { target: { value: "abc" } });
    fireEvent.change(searchInput, { target: { value: "cba" } });

    // Verify that the fetch was aborted
    console.log(fetch.mock.calls[0][1].signal.aborted);
    expect(fetch.mock.calls[0][1].signal.aborted).toBe(true);
  });
});


