var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

  it("can add a mixin", function() {

    var ChildModel = Caplet.Model.extend({
      mixins: [{name:"abba"}]
    });

    var m = new ChildModel();
    expect(m.name).to.be("abba");
  });
});
