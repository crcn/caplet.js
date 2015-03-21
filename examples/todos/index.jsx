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