// TODO - move jsdom stuff to test helpers
var jsdom  = require("jsdom");
var expect = require("expect.js");

// JSDOM must be set to global before react is required() (CC)
global.document = jsdom.jsdom({
  FetchExternalResources: ["script"],
  ProcessExternalResources: ["script"],
  MutationEvents: ["2.0"]
});

global.window    = document.defaultView;
global.navigator = window.navigator;
global.document  = window.document;

// must come after jsdom is setup
var React  = require("react");
var caplet = require("..");

describe(__filename + "#", function() {

  var div;

  beforeEach(function() {
    div = document.createElement("div");
  });

  it("can be registered", function() {

    var Component = React.createClass({
      mixins: [caplet.watchModelsMixin],
      render: function() {
        return React.createElement("div");
      }
    });

    React.render(React.createElement(Component), div);
  });

  it("watches models in props", function() {
    var Component = React.createClass({
      mixins: [caplet.watchModelsMixin],
      render: function() {
        return React.createElement("div", null, this.props.am.get("fn"), this.props.bm.get("ln"));
      }
    });

    var am = new caplet.Model({ fn: "Jeff" });
    var bm = new caplet.Model({ ln: "g" });

    React.render(React.createElement(Component, { am: am, bm: bm }), div);
    expect(div.textContent).to.be("Jeffg");
    am.set("fn", "Oprah");
    expect(div.textContent).to.be("Oprahg");
    bm.set("ln", "w");
    expect(div.textContent).to.be("Oprahw");
  });

  it("watches models in state", function() {

    var am = new caplet.Model({ fn: "Jeff" });
    var bm = new caplet.Model({ ln: "g" });

    var Component = React.createClass({
      mixins: [caplet.watchModelsMixin],
      getInitialState: function() {
        return {
          am: am,
          bm: bm
        };
      },
      render: function() {
        return React.createElement("div", null, this.state.am.get("fn"), this.state.bm.get("ln"));
      }
    });

    React.render(React.createElement(Component), div);
    expect(div.textContent).to.be("Jeffg");
    am.set("fn", "Oprah");
    expect(div.textContent).to.be("Oprahg");
    bm.set("ln", "w");
    expect(div.textContent).to.be("Oprahw");
  });

  it("doesn't re-render if the props haven't changed", function() {

    var ChildComponent = React.createClass({
      mixins: [caplet.watchModelsMixin],
      render: function() {
        return React.createElement("div", null, this.props.model.get("name"));
      }
    });

    var Component = React.createClass({
      mixins: [caplet.watchModelsMixin],
      render: function() {
        return React.createElement(ChildComponent, { model: this.props.model });
      }
    });

    var model = new caplet.Model({ name: "abba" });
    React.render(React.createElement(Component, { model: model }), div);
    expect(div.textContent).to.be("abba");
    model.set("name", "baab");
    expect(div.textContent).to.be("baab");
  });

  it("properly unwatches models when component is unmounted", function() {

    var ChildComponent = React.createClass({
      mixins: [caplet.watchModelsMixin],
      render: function() {
        return React.createElement("div", null, this.props.model.get("name"));
      }
    });

    var Component = React.createClass({
      mixins: [caplet.watchModelsMixin],
      render: function() {
        return this.props.model.show ?
        React.createElement(ChildComponent, { model: this.props.model }) :
        React.createElement("div", null, "hidden");
      }
    });

    var model = new caplet.Model({ name: "abba", show: true });
    React.render(React.createElement(Component, { model: model }), div);
    expect(div.textContent).to.be("abba");
    model.set("name", "baab");
    expect(div.textContent).to.be("baab");
    model.set("show", false);
    expect(div.textContent).to.be("hidden");
    model.set("name", "aaaa");
  });

  it("can change the model", function() {

    var ChildComponent = React.createClass({
      mixins: [caplet.watchModelsMixin],
      render: function() {
        return React.createElement("div", null, this.props.model.get("name"));
      }
    });

    var Component = React.createClass({
      mixins: [caplet.watchModelsMixin],
      getInitialState: function() {
        return {
          model: this.props.model
        };
      },
      render: function() {
        return React.createElement(ChildComponent, { model: this.state.model });
      }
    });

    var model = new caplet.Model({ name: "abba", show: true });
    var component = React.render(React.createElement(Component, { model: model }), div);
    expect(div.textContent).to.be("abba");
    component.setState({ model: new caplet.Model({name:"baab"}) });
    model.set("name", "baab");
    expect(div.textContent).to.be("baab");
    model.set("name", "aaaa");
    expect(div.textContent).to.be("baab");
  });
});
