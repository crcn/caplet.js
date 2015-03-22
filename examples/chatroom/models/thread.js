var Caplet   = require("caplet");
var Messages = require("./messages");

var Thread = Caplet.createModelClass({
    getInitialProperties: function() {
        return {
            messages: Messages({ thread: this })
        }
    },
    didChange: function() {
        this.set("unreadCount", this.messages.filter(function(message) {
            return message.read;
        }).length);
    }
});

module.exports = Thread;