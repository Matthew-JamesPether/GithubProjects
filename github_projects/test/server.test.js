// Imports the necessary files
import { expect } from "chai";
import request from "request";

// Declares a url variable
const url = "http://localhost:8080/gitprojects/";

// Describes which tests will be done on the projects-server.js
describe("Test API responses ", function () {
  // A test for search API
  it("Test for search user API", function (done) {
    // Requests the API using the url
    request(`${url}search/john`, async function (error, response, body) {
      // converts body to a json
      const bodyJson = await JSON.parse(body);

      // Checks if the response status code is equal to 200
      expect(response.statusCode).to.equal(200);

      // Check that the body is an array
      expect(bodyJson).to.be.a("array");

      // Check that the objects have 'login' and 'id' property's
      expect(bodyJson[0]).to.have.property("login");
      expect(bodyJson[0]).to.have.property("id");
      done();
    });
  });

  // A test for the users Data APi
  it("Tests for the users data", function (done) {
    // Requests the API using the url
    request(`${url}user/john`, async function (error, response, body) {
      // converts body to a json
      const bodyJson = await JSON.parse(body);

      // Checks if the response status code is equal to 200
      expect(response.statusCode).to.equal(200);

      // Check that the body is an object
      expect(bodyJson).to.be.a("object");

      // Check that the objects have 'userInfo' and 'reposInfo' property's
      expect(bodyJson).to.have.property("userInfo");
      expect(bodyJson).to.have.property("reposInfo");

      // Check if 'reposInfo' is an array
      expect(bodyJson["reposInfo"]).to.be.a("array");

      // Check that the 'reposInfo' have 'id', 'name' and 'created_at' property's
      expect(bodyJson["reposInfo"][0]).to.have.property("id");
      expect(bodyJson["reposInfo"][0]).to.have.property("name");
      expect(bodyJson["reposInfo"][0]).to.have.property("created_at");
      done();
    });
  });

  // A test for repo API
  it("Test for repo data", function (done) {
    // Requests the API using the url
    request(
      `${url}repo/john/drive.vote`,
      async function (error, response, body) {
        // converts body to a json
        const bodyJson = await JSON.parse(body);

        // Checks if the response status code is equal to 200
        expect(response.statusCode).to.equal(200);

        // Check that the body is an object
        expect(bodyJson).to.be.a("object");

        // Check that the objects have 'commitsInfo' and 'userInfo' property's
        expect(bodyJson).to.have.property("commitsInfo");
        expect(bodyJson).to.have.property("userInfo");

        // Check if 'reposInfo' is an array
        expect(bodyJson["commitsInfo"]).to.be.a("array");

        // Check that the 'reposInfo' have 'author', 'message' and 'date' property's
        expect(bodyJson["commitsInfo"][0]).to.have.property("author");
        expect(bodyJson["commitsInfo"][0]).to.have.property("message");
        expect(bodyJson["commitsInfo"][0]).to.have.property("date");

        done();
      }
    );
  });
});
