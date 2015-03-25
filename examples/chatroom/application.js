var caplet   = require("../..");
var models   = require("./models");
var MainView = require("./views/main");
var React    = require("react");
var Database = require("./database");

module.exports = caplet.createModelClass({
  models: models,
  initialize: function() {
    this.database = {
      threads  : new Database.Collection(models.Threads),
      messages : new Database.Collection(models.Messages),
      users    : new Database.Collection(models.Users)
    };
  },
  render: function(element) {
      React.render(React.createElement(MainView), element);
  }
});