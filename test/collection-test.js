var Collection = require("../lib/collection");
var watchProperty = require("../lib/watch-property");
var expect     = require("expect.js");
var runloop    = require("watchable-object/lib/runloop").instance;

describe(__filename + "#", function() {

  it("can create a new collection class", function() {
    var ChildCollection = Collection.createClass({});
    expect(new ChildCollection() instanceof Collection).to.be(true);
  });

  it("it has a __isCollection flag", function() {
    var ChildCollection = Collection.createClass({});
    expect(ChildCollection().__isCollection).to.be(true);
  });

  it("can create a new collection class without the new keyword", function() {
    var ChildCollection = Collection.createClass({});
    expect(ChildCollection() instanceof Collection).to.be(true);
  });

  it("can can extend a sub class", function() {
    var ChildCollection = Collection.createClass({});
    var ChildCollection2 = ChildCollection.extend({});
    expect(new ChildCollection2() instanceof ChildCollection).to.be(true);
    expect(ChildCollection2() instanceof Collection).to.be(true);
  });

  it("can accept a source in the constructor arg", function() {
    var ChildCollection = Collection.createClass();
    var c = new ChildCollection([1, 2, 3].map(ChildCollection.prototype.modelClass));
    expect(c.at(0).data).to.be(1);
  });

  it("can accept properties in the constructor arg", function() {
    var ChildCollection = Collection.createClass();
    var c = new ChildCollection({ name: "abba" });
    expect(c.name).to.be("abba");
  });

  it("properly deserializes data", function() {
    var ChildCollection = Collection.createClass();
    var c = new ChildCollection({ data: [1, 2, 3, 4] });
    expect(c.at(0).data).to.be(1);
  });

  it("doesn't replace models that have changed in the collection", function() {
    var c = new Collection({data:[1, 2, 3, 4]});
    var m = c.at(0);
    c.set("data", [1, 2, 3, 4]);
    expect(c.at(0)).to.be(m);
    // check resorting
    c.set("data", [4, 3, 2, 1]);
    expect(c.at(3)).to.be(m);
  });

  it("removes a model if it's been disposed of", function() {
    var c = new Collection({data:[1, 2, 3, 4]});
    expect(c.length).to.be(4);
    c.at(0).dispose();
    expect(c.length).to.be(3);
  });

  it("watches a newly created model", function() {
    var c = new Collection({data:[1, 2, 3]});
    expect(c.length).to.be(3);
    var m = c.createModel(4);
    c.push(m);
    expect(c.length).to.be(4);
    m.dispose();
    expect(c.length).to.be(3);
  });

  it("triggers a watcher when a model changes", function() {
    var c = new Collection({data:[1, 2, 3]});
    var i = 0;
    var w = c.watch(function() { i++; });
    c.at(0).set("data", 4);
    c.at(0).set("data", 5);
    runloop.runNow();
    expect(i).to.be(1);
  });

  it("can call toData()", function() {
    var c = new Collection({data:[1, 2, 3]});
    var d = c.toData();
    expect(d[0]).to.be(1);
  });

  it("can call toJSON()", function() {
    var c = new Collection({data:[1, 2, 3]});
    var d = c.toJSON();
    expect(d[0]).to.be(1);
  });

  it("can set the source to undefined", function() {
    var c = new Collection({data:[1, 2, 3]});
    c.set("data", void 0);
    expect(c.length).to.be(0);
  });

  it("doesn't watch a model that's been spliced from the collection", function() {
    var c = new Collection({data:[1, 2, 3]});
    var i = 0;
    var w = c.watch(function() { i++; });
    var m = c.at(0);
    expect(i).to.be(0);
    c.splice(0, 1);
    runloop.runNow();
    expect(i).to.be(1);
    m.set("data", 4);
    expect(i).to.be(1);
  });

  it("calls onChange if it's specified", function() {
    var i = 0;
    var ChildCollection = Collection.extend({ onChange: function() { i++; }});
    var c = new ChildCollection();
    c.push(c.createModel(1));
    runloop.runNow();
    expect(i).to.be(1);
  });

  it("calls getInitialProperties", function() {
    var ChildCollection = Collection.createClass({
      getInitialProperties: function() {
        return { a: 1 };
      }
    });

    var c = new ChildCollection();
    expect(c.a).to.be(1);
  });

  it("only calls onChange after everything has been initialized", function() {
    var i = 0;
    var ChildCollection = Collection.createClass({
      initialize: function() {
        this.set("b", 2);
      },
      onChange: function() {
        i++;
      }
    });

    var c = new ChildCollection({ a: 1,  data: [] });
    c.set("b", 4);
    runloop.runNow();
    expect(i).to.be(1);
  });

  it("properly triggers change on computed property", function() {

    var ChildCollection = Collection.createClass({
      initialize: function() {
        this.onChange();
      },
      onChange: function() {
        var sum = 0;
        this.forEach(function(model) {
          sum += model.data;
        });
        this.set("sum", sum);
      }
    });

    var c = new ChildCollection({data:[1, 2, 3]});
    expect(c.sum).to.be(6);
    var sum = 0;

    watchProperty(c, "sum", function(value) {
      sum = value;
    });

    c.at(0).set("data", 10);
    runloop.runNow();
    expect(sum).to.be(15);
  });

  it("emits dispose when disposed", function() {
    var m = new Collection();
    var i = 0;
    m.once("dispose", function() {
      i++;
    });
    m.dispose();
    runloop.runNow();
    expect(i).to.be(1);
  });

  xit("can specify model properties", function() {
    var ChildCollection = Collection.createClass({
      getModelProperties: function() {
        return { a: 1 };
      }
    });

    var c = ChildCollection();
    expect(c.createModel().a).to.be(1);
  });
});
