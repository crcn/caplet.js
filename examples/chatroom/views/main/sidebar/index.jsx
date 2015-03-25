var React   = require("react");
var Threads = require("./threads");

module.exports = React.createClass({
    render: function() {
        return <div className="row-fluid sidebar">
            <Threads />
        </div>;
    }
});