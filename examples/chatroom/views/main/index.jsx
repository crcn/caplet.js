var React   = require("react");
var Sidebar = require("./sidebar");
var Content = require("./content");

module.exports = React.createClass({
    render: function() {
        return <div className="container main">
            <div className="row">
                <div className="col-sm-3">
                    <Sidebar />
                </div>
                <div className="col-sm-9">
                    <Content />
                </div>
            </div>
        </div>;
    }
});