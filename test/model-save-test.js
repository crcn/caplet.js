var Model = require("../lib/model");
var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

    it("calls 'create' if the model doesn't have a uid", function() {
        var model = new Model(); var ret;
        var i = 0;
        Caplet.save(model, function(){
            i++;
        }, function(){});
        expect(i).to.be(1);
    });


    it("calls 'update' if the model has a uid", function() {
        var model = new Model(); var ret;
        var i = 0;
        Caplet.save(model, function(){
            i++;
        }, function(){});
        expect(i).to.be(1);
    });
});