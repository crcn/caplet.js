var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

  it("can get an async property", function(next) {
    var m = new Caplet.Model();
    Caplet.setVirtuals(m, {
      name: function(onLoad) {
        setTimeout(onLoad, 1, void 0, "abba");
      }
    });
    Caplet.getAsync(m, "name", function(err, value) {
      expect(value).to.be("abba");
      next();
    });
  });
});
