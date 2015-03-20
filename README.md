# caplet.js

[![Build Status](https://travis-ci.org/mojo-js/caplet.js.svg)](https://travis-ci.org/mojo-js/caplet.js) [![Coverage Status](https://coveralls.io/repos/mojo-js/caplet.js/badge.svg?branch=master)](https://coveralls.io/r/mojo-js/caplet.js?branch=master) [![Dependency Status](https://david-dm.org/mojo-js/caplet.js.svg)](https://david-dm.org/mojo-js/caplet.js) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mojo-js/caplet.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Caplet is a model library that works well with ReactJS. 

```javascript
var React  = require("react");
var Caplet = require("capolet");

var PersonModel = Caplet.createModelClass({
  virtuals: {
    "friends": function(onLoad) {
      return $.get("/people/" + this._id + "/friends", onLoad);
    }
  },
  persist: {
    load: function(onLoad) {
      $.get("/people/" + this._id, onLoad);
    }
  }
}); 

var PeopleCollection = Caplet.createCollectionClass({
  modelClass: PersonModel
});

var PersonComponent = React.creatClass({
  componentDidMount: function() {
    this._listener = this.props.model.watch(this._onChange);
  },
  componentWillUnmount: function() {
    this._listener.dispose();
  },
  _onChange: function() {
    this.setState(); //re-render
  },
  showFriends: function() {
    this.setState({ showFriends: true })
  },
  render: function() {
    return { 
      this.state.showFirends ? <ul>{
        (this.getValue("friends") || []).map(function(person) {
          return <li><Person model={person} /></li>;
        });
      }</ul> : <div>{ this.props.model.name }<a href="#" onClick={this.showFriends}>show friends</a></div>
    };
  }
});


React.render(<PersonComponent model={PersonModel({_id:"personId"})} />, document.body);

```

### TODO

- ReactJS adapter
- AngularJS adapter
