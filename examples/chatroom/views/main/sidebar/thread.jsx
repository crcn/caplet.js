var React = require("react");

module.exports = React.createClass({
  render: function() {
    return <li>
      <a href={"#!/threads/"+this.props.thread.uid}>{this.props.thread.name}</a>
    </li>;
  }
});