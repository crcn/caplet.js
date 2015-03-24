var Collection = require("./collection");

module.exports = {
    threads  : new Collection(require("../models/threads")),
    messages : new Collection(require("../models/messages")),
    users    : new Collection(require("../models/users"))
};