var User    = require("./user");
var caplet  = require("../../..");
var expect  = require("expect.js");

describe(__filename + "#", function() {

  it("can be created", function() {
    User();
  });

  it("can load a list of messages", function(next) {

    app.database.messages._items = [
      { uid: "message1", userId: "user1" },
      { uid: "message2", userId: "user2" },
      { uid: "message3", userId: "user1" }
    ];

    var m = User({ uid: "user1", messageId: "message1" });
    caplet.getAsync(m, "messages", function(err, messages) {
      expect(messages.length).to.be(2);
      expect(messages.at(0).uid).to.be("message1");
      expect(messages.at(1).uid).to.be("message3");
      next();
    });
  });

  it("loads itself if there's a missing property", function(next) {

    app.database.users._items = [
      { uid: "user1", name: "abba" },
      { uid: "user2", name: "baab" },
    ];

    var u = User({uid:"user1"});
    caplet.watchProperty(u, "name", function() {
      expect(u.name).to.be("abba");
      next();
    });
    u.get("name");

  });
});