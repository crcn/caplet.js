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
        c.watch(function() { i++ });
        c.get("a");
        expect(i).to.be(1);
    });
});