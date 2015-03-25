var caplet = require("../../../");
var ok     = require("okay");

module.exports = caplet.createModelClass({

    /**
     */

    virtuals: {
        thread: function() {
            app.database.threads.findOne({ uid: this.threadId }, ok(this.set.bind(this, "thread")));
        },
        user: function() {
            app.database.users.findOne({ uid: this.userId }, ok(this.set.bind(this, "user")));
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
