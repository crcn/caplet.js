var Model = require("../lib/model");
var expect = require("expect.js");

describe(__filename + "#", function() {

    it("can create a new model class", function() {
        var ChildModel = Model.createClass({});
        expect(new ChildModel() instanceof Model).to.be(true);
    });

    it("can create without new statement", function() {
        var ChildModel = Model.createClass({});
        expect(ChildModel() instanceof Model).to.be(true);
    });

    it("can properly deserialize data", function() {

        var ChildModel = Model.createClass({
            fromData: function(data) {
                return {
                    firstName : data.firstName,
                    lastName  : data.lastName,
                    fullName  : data.firstName + " " + data.lastName
                }
            },
        });

        var model = new ChildModel({ data: { firstName: "a", lastName: "b" }});

        expect(model.fullName).to.be("a b");
        model.set("data", { firstName: "b", lastName: "c" });
        expect(model.fullName).to.be("b c");

    });

    it("does not attempt to set properties if the data is not an object", function() {
        var model = new Model([1,2,3,4]);
        expect(model[0]).to.be(void 0);
    });

    it("sets data property if the constructor arg is not an object", function() {
        var data = [1,2,3,4];
        var model = new Model(data);
        expect(model.data).to.be(data);
    });

    it("can properly be serialized with data", function() {

        var ChildModel = Model.createClass({
            toData: function() {
                return {
                    firstName : this.firstName,
                    lastName  : this.lastName,
                    fullName  : this.firstName + " " + this.lastName
                }
            },
        });

        var model = new ChildModel({ data: { firstName: "a", lastName: "b" }});
        expect(model.firstName).to.be("a");
        expect(model.lastName).to.be("b");

        expect(model.toData().firstName).to.be("a")
        expect(model.toData().lastName).to.be("b");
    });

    it("does not deserialize data if the type is not an object", function() {
        var model = new Model({ data: [1,2,3,4] });
        expect(model[0]).to.be(void 0);
    });

    it("doesn't cast data as object if data is not an object when toData is called", function() {
        var model = new Model({data:1});
        expect(model.toData()).to.be(1);
    })

    it("can properly be serialized with data & without toData", function() {

        var ChildModel = Model.createClass({});

        var model = new ChildModel({ data: { firstName: "a", lastName: "b" }});
        expect(model.toData().firstName).to.be("a")
        expect(model.toData().lastName).to.be("b");
        expect(model.toData().data).to.be(void 0);
    });

    it("can properly be serialized if there is no data prop", function() {
        var ChildModel = Model.createClass({});

        var model = new ChildModel({ firstName: "a", lastName: "b" });
        expect(model.toData().firstName).to.be("a")
        expect(model.toData().lastName).to.be("b");
    });

    it("can 'get' a property", function() {
        var model = new Model({ a: 1 });
        expect(model.get("a")).to.be(1);
    });

    it("emits a 'missingProperty' event when a property is missing", function(next) {
        var model = new Model();
        model._emitter.on("missingProperty", function(keypath) {
            expect(keypath).to.be("a");
            next();
        });
        model.get("a.b.c.d");
    });


    it("doesn't emit 'missingProperty' twice", function() {
        var model = new Model(), i = 0;
        model._emitter.on("missingProperty", function(keypath) {
            i++;
        });
        model.get("a.b.c.d");
        model.get("a.b.c.d");
        expect(i).to.be(1);
    });

    it("equals true if the data is identical", function() {
        var data = 1;
        var a = new Model(data);
        var b = new Model(data);
        expect(a.equals(b)).to.be(true);
        a.data = b.data = {};
        expect(a.equals(b)).to.be(true);
        a.data = {};
        b.data = {};
        expect(a.equals(b)).to.be(false);
    });

    it("equals true if the uid is the same", function() {
        var a = new Model({uid:1});
        var b = new Model({uid:1});
        expect(a.equals(b)).to.be(true);
    });

    it("can define properties from getInitialProperties", function() {
        var ChildModel = Model.createClass({
            getInitialProperties: function() {
                return {
                    a: "b"
                }
            }
        });

        var m = new ChildModel();
        expect(m.a).to.be("b");
    });

    it("calls onChange on the model if the model has changed", function() {

        var ChildModel = Model.createClass({
            onChange: function() {
                this.set("fullName", this.firstName + " " + this.lastName);
            }
        });

        var m = new ChildModel();
        m.setProperties({ firstName: "a", lastName: "b" });
        expect(m.fullName).to.be("a b");
    });

    it("only calls onChange after everything has been initialized", function() {
        var i = 0;
        var ChildModel = Model.createClass({
            initialize: function() {
                this.set("b", 2);
            },
            onChange: function() {
                i++;
            }
        });

        var c = new ChildModel({ a: 1,  data: "1" });
        c.set("b", 2);
        expect(i).to.be(1);
    });
});