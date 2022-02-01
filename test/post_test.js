const request = require("supertest")("https://swapi.dev");
const expect = require("chai").expect;

describe("\POST", function () {
  it("Verify that the status code is 405", async function () {
    const response = await request.post("/api/planets/3/").send({"name": "Automated testing", "Completed": true});
    expect(response.status).to.eql(405);
  });

//   it("Verify the response message equals \"Method 'POST' not allowed.\"", async function () {
//     const response = await request.get("/api/planets/3/");
//     expect(response._body.detail).to.eql("Method 'POST' not allowed.");
//   });
});
