var Model = require("../lib/model");
var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

    it("can load a singleton value", function() {
        var model = new Model(); var ret;
        Caplet.singleton(model, "property", function(onLoad) {
            onLoad(null, { a: 1 })
        }, function(err, result) {
            ret = result;
        });
        expect(ret.a).to.be(1);
    });

    it("only calls load once if singleton called multiple times", function(next) {
        var i = 0;
        function load(onLoad) {
            i++;
            setTimeout(onLoad, 1, null, { a: 1 });
        }
        var model = new Model(); var ret; var ret2;

        Caplet.singleton(model, "property", load, function(err, result) {
            ret = result;
        });

        Caplet.singleton(model, "property", load, function(err, result) {
            ret2 = result;
        });

        setTimeout(function () {
            expect(i).to.be(1);
            expect(ret.a).to.be(1);
            expect(ret).to.be(ret2);
            next();
        }, 4);
    });

    it("can be disposed", function(next) {
        var i = 0;
        function load(onLoad) {
            i++;
            setTimeout(onLoad, 1, null, { a: 1 });
        }
        var model = new Model(); var ret; var ret2;

        Caplet.singleton(model, "property", load, function(err, result) {
            ret = result;
        });

        var singleton = Caplet.singleton(model, "property", load, function(err, result) {
            ret2 = result;
        });

        setTimeout(function () {
            singleton.dispose();

            Caplet.singleton(model, "property", load);

            setTimeout(function() {
                expect(i).to.be(2);
                next();
            }, 2);
        }, 4);
    });


});