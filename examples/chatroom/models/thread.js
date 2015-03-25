var caplet   = require("../../../");

module.exports = caplet.createModelClass({
    
    /**
     */

    virtuals: {
        messages: function(onLoad) {
            app.database.messages.find({ threadId: this.uid }, onLoad);
        },

        // computed property from messages collection
        participants: function(onLoad) {
            caplet.watchProperty(this, "messages", function(messages) {
                
                var participants = [];
                var used         = {};

                messages.forEach(function(message) {
                    if (used[message.userId]) return;
                    used[message.userId] = 1;
                    participants.push({ uid: message.userId });
                });

                onLoad(void 0, app.models.Users({
                    data: participants
                }));
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
    },

    /**
     */

    onChange: function() {
        var messages = this.messages || [];
        this.set("unreadMessageCount", messages.filter(function(message) {
            return !message.read;
        }).length);
    }
});