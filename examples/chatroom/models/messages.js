var Caplet   = require("caplet");
var Message  = require("./message");

var Messages = Caplet.createCollectionClass({
    modelClass: Message,
    load: function() {
        //persist
    }
});

module.exports = Thread;