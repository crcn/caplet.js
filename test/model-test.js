var Model = require("../lib/model");
var expect = require("expect.js");

describe(__filename + "#", function() {

    it("can create a new model class", function() {
        var ChildModel = Model.createClass({});
        expect(new ChildModel() instanceof Model).to.be(true);
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


});