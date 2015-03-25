var caplet = require("../../..");

module.exports = caplet.models = {
    User     : require("./user"),
    Users    : require("./users"),
    Message  : require("./message"),
    Messages : require("./messages"),
    Thread   : require("./thread"),
    Threads  : require("./threads")
};