const request = require("supertest")("https://swapi.dev");
const expect = require("chai").expect;
const chai = require('chai');
chai.use(require('chai-json-schema'));


describe("\GET", function () {
  
  it("Verify that the status code is 200", async function () {
    const response = await request.get("/api/planets/3/");
    expect(response.status).to.eql(200);
  });

  it("Verify the response headers", async function () {
    const response = await request.get("/api/planets/3/");
    expect(response.header.server).to.eql("nginx/1.16.1");
    expect(response.header.connection).to.eql("close");
    expect(response.header.etag).to.eql("\"ccbca9ad5dbcc6c73413df0765660c26\"");
    expect(response.header.allow).to.contain("GET");
  });

  it("Verify the response data", async function () {
    const response = await request.get("/api/planets/3/");
    expect(response._body.name).to.eql("Yavin IV");
    expect(response._body.climate).to.contain("tropical");
    expect(response._body.diameter).to.eql("10200");
    expect(response._body.residents).to.be.empty;
    expect(response._body.films).to.be.not.empty;
  });

  it("Verify JSON schema", async function () {
    const response = await request.get("/api/planets/3/");
    var schemaPlan = {
        "properties": {
          "name": {
            "type": "string"
          },
          "rotation_period": {
            "type": "string"
          },
          "orbital_period": {
            "type": "string"
          },
          "diameter": {
            "type": "string"
          },
          "climate": {
            "type": "string"
          },
          "gravity": {
            "type": "string"
          },
          "terrain": {
            "type": "string"
          },
          "surface_water": {
            "type": "string"
          },
          "population": {
            "type": "string"
          },
          "residents": {
            "type": "array",
            "items": {}
          },
          "films": {
            "type": "array",
            "items": [
              {
                "type": "string"
              }
            ]
          },
          "created": {
            "type": "string"
          },
          "edited": {
            "type": "string"
          },
          "url": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "rotation_period",
          "orbital_period",
          "diameter",
          "climate",
          "gravity",
          "terrain",
          "surface_water",
          "population",
          "residents",
          "films",
          "created",
          "edited",
          "url"
        ]
      }
    expect(response.text).to.be.jsonSchema(schemaPlan);
  });
});