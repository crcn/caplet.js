var caplet   = require("caplet");
var Messages = require("./messages");
var Users    = require("./users");

module.exports = caplet.createModelClass({

    /**
     */

    virtuals: {
        messages: function(onLoad) {
            caplet.load(Messages({ thread: this }), function(onLoad) {
                db.messages.find({ threadId: this.thread.uid }, onLoad);
            }, onLoad);
        },
        participants: function(onLoad) {
            caplet.load(Users({ thread: this }), function(onLoad) {
                db.users.find({ threadId: this.thread.uid }, onLoad);
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