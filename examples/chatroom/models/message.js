var Caplet   = require("caplet");
var Messages = require("./messages");

var Message = Caplet.createModelClass({
    markRead: function() {
        this.set("read", true);
    }
});

module.exports = Message;