// Imports files
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SearchResults from "../Components/SearchResults";

// Resets the mock function
  beforeEach(() => {
    fetch.resetMocks();
  });

  // Test if data is rendered
  test("Tests if the selected users data is rendered", async () => {
    // Mock props 
    const mockSetUser = jest.fn();
    const mockSetIsLoading = jest.fn();
    const mockSetInput = jest.fn();
    const mockSetResults = jest.fn();

    // Mock user data for the tests
    const mockUserData = {
      id: 1,
      login: "john_doe",
    };

    // Mock search results for test
    const mockSearchResults = [
      {
        id: 1,
        login: "john_doe",
      },
    ];

    // Mock the fetch response for the selected user
    fetch.mockResponseOnce(JSON.stringify(mockUserData));

    // Render the SearchResults component
    const { getByText } = render(
      <SearchResults
        isLoading={false}
        results={mockSearchResults}
        setUser={mockSetUser}
        setIsLoading={mockSetIsLoading}
        setInput={mockSetInput}
        setResults={mockSetResults}
      />
    );

    // Simulate clicking on the user result
    fireEvent.click(getByText("john_doe"));

    // Wait for the fetch to be called and the response to be processed
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:8080/gitprojects/user/john_doe");
    });

    // Check if setUser is called with the correct data
    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith(mockUserData);
    });

    // Check if the loading state was properly managed
    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });
