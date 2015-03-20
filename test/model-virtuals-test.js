var Model = require("../lib/model");
var expect = require("expect.js");

describe(__filename + "#", function() {

    it("calls a virtual if a property is missing", function() {
        var i = 0;
        var ChildModel = Model.extend({
            virtuals: {
                a: function(next) {
                    i++;
                }
            }
        });

        var c = new ChildModel();
        c.get("a");
        expect(i).to.be(1);
    });

    it("calls a virtual if a keypath is missing", function() {
        var i = 0;
        var ChildModel = Model.extend({
            virtuals: {
                a: function(next) {
                    i++;
                }
            }
        });

        var c = new ChildModel();
        c.get("a.b.c");
        expect(i).to.be(1);
    });

    it("properly sets the virtual property in the model", function() {
        var ChildModel = Model.extend({
            virtuals: {
                a: function(next) {
                    next(null, "b");
                }
            }
        });

        var c = new ChildModel();
        c.get("a");
        expect(c.a).to.be("b");
    });


    it("emits a change event on the child model when a virtual is called", function() {
        var ChildModel = Model.extend({
            virtuals: {
                a: function(next) {
                    next(null, "b");
                }
            }
        });

        var c = new ChildModel();
        var i = 0;
        c.watch(function() { i++ });
        c.get("a");
        expect(i).to.be(1);
    });
});