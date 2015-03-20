var Caplet = require("../../lib");
var React  = require("react");

/**
 */

var TodoModel = Caplet.createModelClass({
    remove: function() {
        this.collection.splice(this.collection.indexOf(this), 1);
    }
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
        return <li>{this.props.todo.text} <a href="#" onClick={this.props.todo.remove.bind(this.props.todo)}>x</a></li>
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