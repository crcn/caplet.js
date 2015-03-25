var Model = require("../lib/model");
var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

  it("can load a model", function() {
    var model = new Model(); var ret;
    Caplet.load(model, function(onLoad) {
      onLoad(null, { a: 1 });
    }, function(err, result) {
      ret = result;
    });
    expect(model.a).to.be(1);
    expect(model.data.a).to.be(1);
    expect(ret).to.be(model);
  });

  it("can handle an error", function() {
    var model = new Model(); var error;
    Caplet.load(model, function(onLoad) {
      onLoad(new Error("fail"));
    }, function(err, result) {
      error = err;
    });
    expect(error.message).to.be("fail");
  });

  it("context of load is the model", function() {
    var model = new Model();
    Caplet.load(model, function(onLoad) {
      expect(this).to.be(model);
    });
  });
});
