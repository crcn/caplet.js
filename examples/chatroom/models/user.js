var caplet = require("../../../");

module.exports = caplet.createModelClass({

    /**
     */

    virtuals: {
        messages: function(onLoad) {
            app.database.messages.find({ userId: this.uid }, onLoad);
        }
    },

    /**
     */

    initialize: function() {
        caplet.setVirtuals(this, this.virtuals);
    }
});
