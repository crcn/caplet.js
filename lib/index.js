exports.Model                 = require("./model").createClass();
exports.Collection            = require("./collection").createClass();
exports.createModelClass      = require("./model").createClass;
exports.createCollectionClass = require("./collection").createClass;
exports.setVirtuals           = require("./setVirtuals");
exports.load                  = require("./load");
exports.singleton             = require("./singleton");
exports.save                  = require("./save");
exports.watchProperty         = require("./watchProperty");

if (process.browser) {
    global.Caplet = module.exports;
}