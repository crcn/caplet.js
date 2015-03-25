var React  = require("react");
var Thread = require("./thread");
var caplet = require("../../../../..");

module.exports = React.createClass({
  mixins: [caplet.watchModelsMixin],
  getInitialState: function() {
    return {
      threads: app.allThreads
    };
  },
  render: function() {
    return <ul>{
      (this.state.threads || []).map(function(thread) {
        return <Thread thread={thread} />;
      })
    }</ul>
  }
});