var Messages = require("./messages");
var caplet   = require("../../..");
var expect   = require("expect.js");

describe(__filename + "#", function() {

  it("can be created", function() {
    Messages();
  });
});