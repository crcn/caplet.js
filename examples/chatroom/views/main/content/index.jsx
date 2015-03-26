var React      = require("react");
var Messages   = require("./messages");
var MessageBox = require("./messageBox");
var caplet     = require("../../../../..");

module.exports = React.createClass({
    mixins: [caplet.watchModelsMixin],
    getInitialState: function() {
      return {
        currentThread: caplet.reference(app, "currentThread")
      }
    },
    render: function() {
        return <div className="row content">
            <div className="col-sm-12">
                <Messages messages={this.state.currentThread.get("value.messages")} />
                <MessageBox messages={this.state.currentThread.get("value.messages")} />
            </div>
        </div>;
    }
});