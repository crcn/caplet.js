var Model = require("../lib/model");
var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

    it("can load a model", function() {
        var model = new Model(); var ret;
        Caplet.load(model, function(onLoad) {
            onLoad(null, { a: 1 })
        }, function(err, result) {
            ret = result;
        });
        expect(model.a).to.be(1);
        expect(model.data.a).to.be(1);
        expect(ret).to.be(model);
    });

    it("")
});