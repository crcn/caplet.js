var React  = require("react");
var Thread = require("./thread");

module.exports = React.createClass({
  render: function() {
    return <ul>{
      (this.props.threads || []).map(function(thread) {
        return <Thread thread={thread} />;
      })
    }</ul>
  }
});