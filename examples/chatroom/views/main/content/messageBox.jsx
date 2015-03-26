var React   = require("react");
var Message = require("./messages");
var caplet  = require("../../../../..");

module.exports = React.createClass({
    handleKeyDown: function(event) {
      if (event.keyCode !== 13) return;
      var ref = this.refs.input.getDOMNode();
      var text = ref.value;
      this.props.messages.create({ text: text }).save();
      ref.value = "";
    },
    render: function() {
        return <div>
          <input ref="input" placeholder="Enter a message" onKeyDown={this.handleKeyDown} className="form-control"></input>
        </div>;
    }
});