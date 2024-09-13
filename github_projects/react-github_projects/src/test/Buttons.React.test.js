// Imports files
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ProfileLayout from "../Components/ProfileLayout";

// Describes which type of tests will be run for the profile layout
describe("Testing all buttons", () => {
  // Mock props 
  const setLayout = jest.fn();
  const setRepoData = jest.fn();
  const setLoadingRepo = jest.fn();

  // Mock user data for the tests
  const mockUserData = {
    userInfo: {
      login: "john_doe",
      avatar_url: "https://example.com/avatar.jpg",
    },
    reposInfo: [
      { id: 1, name: "repo1" },
      { id: 2, name: "repo2" },
    ],
  };

  // Mock repo data for the tests
  const mockRepoData = { name: "repo1", description: "A test repo" };

  // Resets the mock function
  beforeEach(() => {
    fetch.resetMocks();
  });

  // Tests repo buttons
  test("Tests if repo buttons are displayed and renders repo layout when selected", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockRepoData));

    // Render the ProfileLayout component
    const { getByText } = render(
      <ProfileLayout
        userData={mockUserData}
        setLayout={setLayout}
        setLoadingRepo={setLoadingRepo}
        setRepoData={setRepoData}
      />
    );

    // Verify that the repo buttons have been rendered
    expect(getByText("repo1")).toBeInTheDocument();
    expect(getByText("repo2")).toBeInTheDocument();

    // Simulate clicking the repo button (repo1)
    const repoButton = getByText("repo1");
    fireEvent.click(repoButton);

    // Verify that loading state is set to true
    expect(setLoadingRepo).toHaveBeenCalledWith(true);

    // Wait for the fetch to be called and the response to be processed
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8080/gitprojects/repo/john_doe/repo1"
      );
    });

    // Verify that repo data is set correctly
    await waitFor(() => {
      expect(setRepoData).toHaveBeenCalledWith(mockRepoData);
    });

    // Verify that loading state is set to false after data is loaded
    expect(setLoadingRepo).toHaveBeenCalledWith(false);
    // Verify that layout is set to 'ReposLayout'
    expect(setLayout).toHaveBeenCalledWith("ReposLayout");
  });

  // Tests bio buttonS
  test("Tests if bio button is displayed and renders bio layout when selected", async () => {
    // Render the ProfileLayout component
    const { getByText } = render(
      <ProfileLayout
        userData={mockUserData}
        setLayout={setLayout}
        setLoadingRepo={setLoadingRepo}
        setRepoData={setRepoData}
      />
    );

    // Verify that bio button is rendered
    expect(getByText("Back to Bio")).toBeInTheDocument();

    // Simulate clicking the bio button
    const bioButton = getByText("Back to Bio");
    fireEvent.click(bioButton);

    // Verify that layout is set to 'BioLayout'
    expect(setLayout).toHaveBeenCalledWith("BioLayout");
  });
});
