var Message = require("./message");
var caplet  = require("../../..");
var expect  = require("expect.js");

describe(__filename + "#", function() {

  it("can be created", function() {
    Message();
  });

  it("can load the thread of a message", function(next) {
    var threadData;
    app.database.threads._items = [threadData = { uid: "thread1" }];

    var m = Message({ uid: "message1", threadId: "thread1" });
    caplet.getAsync(m, "thread", function(err, thread) {
      expect(thread.data).to.be(threadData);
      expect(thread).to.be.an(app.models.Thread);
      next();
    });
  });

  it("can load the user of a message", function(next) {
    var userData;
    app.database.users._items = [userData = { uid: "user1" }];

    var m = Message({ uid: "message1", userId: "user1" });
    caplet.getAsync(m, "user", function(err, user) {
      expect(user.data).to.be(userData);
      expect(user).to.be.an(app.models.User);
      next();
    });
  });

  it("can insert a new message into the database", function(next) {
    var m = Message({text:"hello"});
    m.save(function() {
      expect(app.database.messages._items[0].text).to.be("hello");
      next();
    });
  });
});
