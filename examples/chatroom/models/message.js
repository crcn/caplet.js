var caplet = require("../../../");

module.exports = caplet.createModelClass({

    /**
     */

    virtuals: {
        thread: function(onLoad) {
            app.database.threads.findOne({ uid: this.threadId }, onLoad);
        },
        user: function(onLoad) {
            app.database.users.findOne({ uid: this.userId }, onLoad);
        }
    },

    /**
     */

    initialize: function() {
        caplet.setVirtuals(this, this.virtuals);
    },

    /**
     */

    save: function(onSave) {
        app.database.messages.save(this, onSave);
    }
});
