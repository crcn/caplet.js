var caplet = require("caplet");

module.exports = caplet.models = {
    User     : require("./user"),
    Message  : require("./message"),
    Messages : require("./messages"),
    Thread   : require("./thread"),
    Threads  : require("./threads")
};