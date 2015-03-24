var caplet   = require("caplet");
var Messages = require("./messages");

module.exports = caplet.createModelClass({

    /**
     */

    virtuals: {
        messages: function(onLoad) {
            caplet.load(Messages({ thread: this }), function(onLoad) {
                db.messages.find({ threadId: this.thread.uid }, onLoad);
            }, onLoad);
        }
    },

    /**
     */

    initialize: function() {
        caplet.setVirtuals(this, this.virtuals);
    },

    /**
     */

    onChange: function() {
        this.set("unreadMessageCount", (this.messages || []).filter(function(message) {
            return !message.read;
        }).length);
    }

});