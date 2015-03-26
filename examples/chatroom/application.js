var caplet   = require("../..");
var models   = require("./models");
var MainView = require("./views/main");
var React    = require("react");
var Database = require("./database");
var ok       = require("okay");

module.exports = caplet.createModelClass({
  models: models,
  initialize: function() {

    this.database = {
      threads  : new Database.Collection("threads", models.Threads),
      messages : new Database.Collection("messages", models.Messages),
      users    : new Database.Collection("users", models.Users)
    };

    this._loadFixtures();

    this.set("allThreads", this.database.threads.all());
    this.database.threads.findOne({ uid: "thread1" }, ok(this.set.bind(this, "currentThread")));
  },
  render: function(element) {
      React.render(React.createElement(MainView), element);
  },
  _loadFixtures: function() {
    this.database.threads._items = [
      { uid: "thread1", name: "Test Thread" },
      { uid: "thread2", name: "Test Thread 2" }
    ];

    this.database.messages._items = [
      { threadId: "thread1", uid: "message1", text: "test text" },
      { threadId: "thread1", uid: "message2", text: "test text 2" }
    ];
  }
});