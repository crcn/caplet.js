var Model = require("../lib/model");
var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

  it("calls 'create' if the model doesn't have a uid", function() {
    var model = new Model(); var ret;
    var i = 0;
    Caplet.save(model, function() {
      i++;
    }, function() { });
    expect(i).to.be(1);
  });

  it("calls 'update' if the model has a uid", function() {
    var model = new Model({uid:1}); var ret;
    var i = 0;
    Caplet.save(model, function() { }, function() {
      i++;
    });
    expect(i).to.be(1);
  });

  it("context of update & create are model", function() {
    var model = new Model({});
    Caplet.save(model, function() {
      expect(this).to.be(model);
    });

    model = new Model({ uid: 11 });

    Caplet.save(model, function() { }, function() {
      expect(this).to.be(model);
    });
  });

  it("can pass a callback", function(next) {

    model = new Model({ uid: 11 });
    Caplet.save(model, function() { }, function(onLoad) {
      expect(this).to.be(model);
      onLoad();
    }, function() {
      next();
    });
  })
});
