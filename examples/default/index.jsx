var Caplet = require("../../lib");
var React  = require("react");

var Person = Caplet.createModelClass({
    initialize: function() {
        Caplet.setVirtuals(this, {
            friends: function(onLoad) {
                onLoad(null, [{ name: "jake" }, { name: "jeff" }].map(Person));
            }
        })
    }
});


var PeopleComponent = React.createClass({

    /**
     */

    mixins: [Caplet.watchModelsMixin],

    /**
     */

    showFriends: function() {
        this.setState({ showFriends: true });
    },

    /**
     */

    getInitialState: function() {
        return {};
    },

    /**
     */

    render: function() {
        return <div>{ this.props.person.get("name") } { this.state.showFriends ? 
            <ul> { (this.props.person.get("friends") || []).map(function(person) {
                return <li><PeopleComponent person={person} /></li>;
            }) } </ul> 
        : <a href="#" onClick={this.showFriends}>Show Friends</a> }</div>
    }
});

/**
 */

React.render(<PeopleComponent person={Person({name:"John"})} />, document.body);