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

  it("merges the returned values from all mixins", function() {

    var proto = _mixin([
      { a: function() { return { a: 1 }; } },
      { a: function() { return { b: 1 }; } },
      { a: function() { return { c: 1 }; } }
    ]);

    var ret = proto.a();
    expect(ret.a).to.be(1);
    expect(ret.b).to.be(1);
    expect(ret.c).to.be(1);
  });
});
