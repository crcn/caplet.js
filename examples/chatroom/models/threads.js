var caplet = require("caplet");

module.exports = caplet.createCollectionClass({
    modelClass: require("./thread")
});