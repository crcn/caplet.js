var caplet = require("caplet");
var db     = require("../database");

module.exports = caplet.createModelClass({

    virtuals: {
        messages: function(onLoad) {
            db.messages.find({ userId: this.user.uid }, onLoad);
        }
    },

    initialize: function() {
        caplet.setVirtuals(this, this.virtuals);
    }
});