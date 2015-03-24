var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

  it("can add a mixin", function() {

    var ChildCollection = Caplet.Collection.extend({
      mixins: [{name:"abba"}]
    });

    var m = new ChildCollection();
    expect(m.name).to.be("abba");
  });
});
