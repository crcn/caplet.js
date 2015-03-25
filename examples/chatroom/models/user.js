var caplet = require("../../../");
var ok     = require("okay");

module.exports = caplet.createModelClass({

    /**
     */

    virtuals: {
        "messages": function() {
            app.database.messages.find({ userId: this.uid }, ok(this.set.bind(this, "messages")));
        },
        "*": function() {
            app.database.users.findOne({ uid: this.uid }, this);
        }
    },

    /**
     */

    initialize: function() {
        caplet.setVirtuals(this, this.virtuals);  
    }
});
