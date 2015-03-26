var caplet   = require("../..");
var models   = require("./models");
var MainView = require("./views/main");
var React    = require("react");
var Database = require("./database");

module.exports = caplet.createModelClass({
  models: models,
  initialize: function() {

    this.database = {
      threads  : new Database.Collection("threads", models.Threads),
      messages : new Database.Collection("messages", models.Messages),
      users    : new Database.Collection("users", models.Users)
    };

    this.database.threads._items = [
      { uid: "thread1", name: "Test Thread" },
      { uid: "thread2", name: "Test Thread 2" }
    ];

    this.set("allThreads", this.database.threads.all());

    this.allThreads.watch(function() {
      console.log("CHANGE");
    });
    
    this.set("currentThread", this.database.threads.findOne({uid:"thread1"}));
  },
  render: function(element) {
      React.render(React.createElement(MainView), element);
  }
});