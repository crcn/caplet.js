var caplet   = require("../../../");
var ok       = require("okay");

module.exports = caplet.createModelClass({

    /**
     */

    unreadMessageCount: 0,
    
    /**
     */

    virtuals: {

        // start computations on messages only as they're
        // demanded by the application
        messages: function() {
            var messages = app.database.messages.find({ threadId: this.uid }, ok(this.set.bind(this, "messages")));

            // update unreadMessageCount whenever the messages collection
            // changes
            messages.watch(function() {
                this.set("unreadMessageCount", messages.filter(function(message) {
                    return !message.read;
                }).length);
            }.bind(this));
        },

        // start computing participants
        participants: function(onLoad) {

            // create the collection immediately so we only
            // apply an update to an existing collection (Users)
            // whenever messages changes
            var users = app.models.Users();

            // pluck participants from the messages & update users
            caplet.watchProperty(this, "messages", function(messages) {
                
                var participants = [];
                var used         = {};

                messages.forEach(function(message) {
                    if (used[message.userId]) return;
                    used[message.userId] = 1;
                    participants.push({ uid: message.userId });
                });

                users.set("data", participants);
                this.set("participants", users);
            }).trigger();
        }
    },

    /**
     */

    initialize: function() {
        caplet.setVirtuals(this, this.virtuals);
    },

    /**
     */

    addMessage: function(properties, onSave) {
        caplet.getAsync(this, "messages", function(err, messages) {
            messages.create(properties).save(onSave);
        }); 
    }
});
