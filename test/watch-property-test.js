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

  it("triggers a listener if watched value triggers a change", function() {
    var a = new Model({ b: new Model() });
    var i = 0;
    Caplet.watchProperty(a, "b", function() {
      i++;
    }).trigger();

    a.b.set("c", 1);
    a.b.set("d", 1);
    expect(i).to.be(3);
  });
});
