var React   = require("react");
var Message = require("./messages");
var caplet  = require("../../../../..");

module.exports = React.createClass({
    render: function() {
        return <li>
          { this.props.message.text } <a href="#" onClick={this.props.message.dispose.bind(this.props.message)}>x</a>
        </li>;
    }
});