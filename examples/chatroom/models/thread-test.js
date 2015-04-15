var Thread  = require("./thread");
var caplet  = require("../../..");
var expect  = require("expect.js");
var runloop    = require("watchable-object/lib/runloop").instance;

describe(__filename + "#", function() {

  it("can be created", function() {
    Thread();
  });

  it("can load a list of participants", function(next) {
    var messageData;
    app.database.messages._items = [
      { threadId: "thread1", uid: "message1", userId: "user1" },
      { threadId: "thread1", uid: "message2", userId: "user2" },
      { threadId: "thread2", uid: "message3", userId: "user2" },
      { threadId: "thread1", uid: "message4", userId: "user1" }
    ];

    var m = Thread({ uid: "thread1" });
    caplet.getAsync(m, "participants", function(err, participants) {
      expect(participants.length).to.be(2);
      expect(participants.at(0).uid).to.be("user1");
      expect(participants.at(1).uid).to.be("user2");
      next();
    });
  });

  it("has an initial unreadMessage count of 0", function() {
    var m = Thread();
    expect(m.unreadMessageCount).to.be(0);
  });

  it("can add a message", function(next) {
    var m = Thread({ uid: "thread1" });
    m.addMessage({ text: "hello" }, function() {
      expect(m.messages.length).to.be(1);
      next();
    });
  });

  it("updates the list of participants as a message is added", function(next) {
    var m = Thread({ uid: "thread1" });
    caplet.getAsync(m, "participants", function() {
      m.addMessage({ text: "hello", uid: "userId" }, function() {
        runloop.runNow();
        expect(m.participants.length).to.be(1);
        expect(m.messages.length).to.be(1);
        next();
      });
    });
  });

  it("updates the unreadMessageCount when a new message is added", function(next) {
    var m = Thread({ uid: "thread1" });
    m.addMessage({ text: "hello" }, function() {
      runloop.runNow();
      expect(m.unreadMessageCount).to.be(1);
      next();
    });
  });

  it("does not modify the unreadMessageCount if a new message has already been flagged as read", function(next) {

    var m = Thread({ uid: "thread1" });
    m.addMessage({ text: "hello", read: true }, function() {
      runloop.runNow();
      expect(m.unreadMessageCount).to.be(0);
      next();
    });
  });

  it("can mark a new message as read & update the unreadMessageCount", function(next) {
    var m = Thread({ uid: "thread1" });
    m.addMessage({ text: "hello" }, function(err, message) {
      runloop.runNow();
      expect(m.unreadMessageCount).to.be(1);
      message.set("read", true);
      runloop.runNow();
      expect(m.unreadMessageCount).to.be(0);
      next();
    });
  });
});
