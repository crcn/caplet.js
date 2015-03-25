var Model = require("../lib/model");
var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

  it("creates a new instance of a property doesn't exist", function() {
    var ref = Caplet.recycle(void 0, Model, { name: "blarg" });
    expect(ref.name).to.be("blarg");
  });

  it("recycles a model if the instance type is the same", function() {
    var m = new Model();
    var ref = Caplet.recycle(m, Model, { name: "blarg" });
    expect(ref).to.be(m);
    expect(ref.name).to.be("blarg");
  });

  it("creates a new instance of the instance type isn't the same", function() {
    var m = new Model.extend();
    var ref = Caplet.recycle(m, Model, { name: "blarg" });
    expect(ref).not.to.be(m);
    expect(ref.name).to.be("blarg");
  });
});
