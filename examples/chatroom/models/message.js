var caplet = require("caplet");
var Thread = require("./thread");
var User   = require("./user");

module.exports = caplet.createModelClass({

    virtuals: {
        thread: function(onLoad) {
            db.threads.findOne({ uid: this.threadId }, onLoad);
        },
        user: function(onLoad) {
            db.users.findOne({ uid: this.userId }, onLoad);
        }
    },

    initialize: function() {
        caplet.setVirtuals(this, this.virtuals);
    }
});