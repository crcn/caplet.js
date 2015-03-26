var React   = require("react");
var Message = require("./message");
var caplet  = require("../../../../..");

module.exports = React.createClass({
    render: function() {
        return <ul>
            { (this.props.messages || []).map(function(message) {
                return <Message message={message} />;
            })}
        </ul>;
    }
});