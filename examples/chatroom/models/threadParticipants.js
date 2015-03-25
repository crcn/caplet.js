var Caplet   = require("caplet");
var User     = require("./user");

var ThreadParticipants = Caplet.createCollectionClass({
    modelClass: User,
    load: function(onLoad) {
      Caplet.load(this, function(onLoad) {
        collections.messages.find({ thread: this.user._id }, onLoad);
      }, onLoad);
    }
});

module.exports = Thread;