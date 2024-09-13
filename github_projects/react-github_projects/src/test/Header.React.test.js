//Imports files
import { React, useState } from "react";
import HeaderLayout from "../Components/HeaderLayout";
import renderer from "react-test-renderer";

// Test the header component
test("renders Header correctly", () => {
  const tree = renderer
    .create(<HeaderLayout heading={"GITHUB PROJECTS"} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
