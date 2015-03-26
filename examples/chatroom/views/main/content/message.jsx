var React   = require("react");
var Message = require("./messages");
var caplet  = require("../../../../..");

module.exports = React.createClass({
    render: function() {
        return <li>
          { this.props.message.text }
        </li>;
    }
});