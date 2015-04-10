var _mixin = require("../lib/_mixin");
var expect = require("expect.js");

describe(__filename + "#", function() {

  it("can create a new mixins", function() {
    expect(typeof _mixin([])).to.be("object");
  });

  it("combines all mixin properties into one prototype", function() {
    var proto = _mixin([{a:1, b:2}]);
    expect(proto.a).to.be(1);
    expect(proto.b).to.be(2);
  });

  it("properly combines functions", function() {

    var i = 0;

    var proto = _mixin([
      { a: function() { i++; } },
      { b: function() { i++; } }
    ]);

    proto.a();
    proto.b();

    expect(i).to.be(2);
  });

  it("combines the same functions as one", function() {

    var i = 0;

    var proto = _mixin([
      { a: function() { i++; } },
      { a: function() { i++; } },
      { a: function() { i++; } }
    ]);

    proto.a();

    expect(i).to.be(3);
  });
});
