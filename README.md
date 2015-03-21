# caplet.js

[![Build Status](https://travis-ci.org/mojo-js/caplet.js.svg)](https://travis-ci.org/mojo-js/caplet.js) [![Coverage Status](https://coveralls.io/repos/mojo-js/caplet.js/badge.svg?branch=master)](https://coveralls.io/r/mojo-js/caplet.js?branch=master) [![Dependency Status](https://david-dm.org/mojo-js/caplet.js.svg)](https://david-dm.org/mojo-js/caplet.js) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mojo-js/caplet.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Caplet is a model library that works well with ReactJS. 

Motivation:

- asynchronous models - make API calls as they're needed

```javascript
var Caplet = require("../../lib");
var React  = require("react");

/**
 */

var TodoModel = Caplet.createModelClass({
});

/**
 */

var TodoCollection = Caplet.createCollectionClass({
    modelClass: TodoModel
});

/**
 */

var TodoComponent = React.createClass({
    mixins: [Caplet.watchModelsMixin],
    render: function() {
        return <li><a href="#" onClick={this.props.todo.dispose.bind(this.props.todo)}>x</a> {this.props.todo.text}</li>
    }
}); 

/**
 */

var TodosComponents = React.createClass({
    mixins: [Caplet.watchModelsMixin],
    handleKeyDown: function(event) {
        if (event.keyCode !== 13) return;
        this.props.todos.create({ text: this.refs.todoText.getDOMNode().value });
    },
    render: function() {
        return <div>
            <input type="text" ref="todoText" onKeyDown={this.handleKeyDown} />
            <ul>{ this.props.todos.map(function(todo) {
                return <TodoComponent todo={todo} />;
            })}</ul>
        </div>
    }
}); 



React.render(<TodosComponents todos={ TodoCollection({
    data: [{ text: "drive car" }, { text: "wash car" }]
})} />, document.body);
```

### TODO

- ReactJS adapter
- AngularJS adapter
