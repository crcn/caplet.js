var Model = require("../lib/model");
var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

  it("watchProperty callback context is mdoel", function() {
    var model = new Model(); var ret;
    Caplet.watchProperty(model, "a", function() {
      expect(this).to.be(model);
    });
    model.set("a", 1);
  });

});
