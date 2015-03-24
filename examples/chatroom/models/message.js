var caplet = require("caplet");

module.exports = caplet.createModelClass({

    virtuals: {
        thread: function(onLoad) {
            caplet.load(Thread({ uid: this.threadId }), function(onLoad) {
                db.threads.find({ uid: this.uid }, onLoad);
            }, onLoad);
        },
        user: function(onLoad) {
            caplet.load(User({ uid: this.userId }), function(onLoad) {
                db.users.find({ uid: this.uid }, onLoad);
            }, onLoad);
        }
    },

    initialize: function() {
        caplet.setVirtuals(this, this.virtuals);
    }
});