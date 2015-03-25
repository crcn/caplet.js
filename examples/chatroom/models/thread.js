var caplet   = require("../../../");

module.exports = caplet.createModelClass({
    
    /**
     */

    virtuals: {
        messages: function(onLoad) {
            db.messages.find({ threadId: this.thread.uid }, onLoad);
        },
        participants: function(onLoad) {
            db.users.find({ threadId: this.thread.uid }, onLoad);
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