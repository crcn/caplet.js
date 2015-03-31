var caplet = require("../../../");

module.exports = caplet.createCollectionClass({
    modelClass: require("./message"),
    create: function(properties) {
      var m = this.createModel(properties);
      this.push(m);
      return m;
    }
});