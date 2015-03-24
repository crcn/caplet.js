var caplet   = require("caplet");
var MainView = require("./views/main");
var React    = require("react");

module.exports = caplet.createModelClass({
    initialize: function() {

    },
    render: function(element) {
        React.render(React.createElement(MainView), element);
    }
});