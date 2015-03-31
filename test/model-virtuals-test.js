var Model = require("../lib/model");
var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

  it("calls a virtual if a property is missing", function() {
    var i = 0;
    var ChildModel = Model.extend({});

    var c = new ChildModel();
    Caplet.setVirtuals(c, {
      a: function(next) {
        i++;
      }
    });

    c.get("a");
    expect(i).to.be(1);
  });

  it("calls a virtual if a keypath is missing", function() {
    var i = 0;
    var ChildModel = Model.extend();

    var c = new ChildModel();
    Caplet.setVirtuals(c, {
      a: function(next) {
        i++;
      }
    });
    c.get("a.b.c");
    expect(i).to.be(1);
  });

  it("properly sets the virtual property in the model", function() {
    var ChildModel = Model.extend();

    var c = new ChildModel();
    Caplet.setVirtuals(c, {
      a: function(next) {
        next(null, "b");
      }
    });
    c.get("a");
    expect(c.a).to.be("b");
  });

  it("emits a change event on the child model when a virtual is called", function() {
    var ChildModel = Model.extend();

    var c = new ChildModel();
    Caplet.setVirtuals(c, {
      a: function(next) {
        next(null, "b");
      }
    });
    var i = 0;
    c.watch(function() { i++; });
    c.get("a");
    expect(i).to.be(1);
  });

  it("can define setVirtuals multiple times", function() {
    var m = new Model();

    Caplet.setVirtuals(m, {
      a: function(next) {
        next(null, "b");
      }
    });

    Caplet.setVirtuals(m, {
      b: function(next) {
        next(null, "c");
      }
    });

    m.get("b");
    m.get("d"); // trigger missing prop
    expect(m.b).to.be("c");
    m.get("a");
    expect(m.a).to.be("b");
  });

  it("can handle an error", function() {
    var ChildModel = Model.extend();

    var c = new ChildModel();
    Caplet.setVirtuals(c, {
      a: function(next) {
        next(new Error("abba"));
      }
    });

    var error;

    c.on("error", function(err) {
      error = err;
    });

    c.get("a");
    expect(error.message).to.be("abba");
  });

  it("can use the wildcard property", function() {
    var ChildModel = Model.extend();
    var c = new ChildModel();

    Caplet.setVirtuals(c, {
      "*": function(property, next) {
        next(null, property);
      }
    });

    c.get("a");
    expect(c.get("a")).to.be("a");

    c.get("b");
    expect(c.get("b")).to.be("b");
  });

  it("sets the returned value as a property on the model", function() {

    var c = new Model();

    Caplet.setVirtuals(c, {
      "name": function() {
        return "abba";
      }
    });

    expect(c.get("name")).to.be("abba");
  });

  it("can return a false value and still set the virtual", function() {

    var c = new Model();

    Caplet.setVirtuals(c, {
      "read": function() {
        return false;
      }
    });

    expect(c.get("read")).to.be(false);
  });

  it("can set the value in the virtual property", function() {

    var c = new Model();

    Caplet.setVirtuals(c, {
      "name": function() {
        this.set("name", "abba");
      }
    });

    expect(c.get("name")).to.be("abba");
  });
});
