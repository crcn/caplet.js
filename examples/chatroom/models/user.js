var caplet = require("caplet");

module.exports = caplet.createModelClass({

    virtuals: {
        messages: function(onLoad) {
            caplet.load(Messages({ user: this }), function(onLoad) {
                db.messages.find({ userId: this.user.uid }, onLoad);
            }, onLoad);
        }
    },

    initialize: function() {
        caplet.setVirtuals(this, this.virtuals);
    }
});