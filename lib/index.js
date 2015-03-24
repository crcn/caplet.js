exports.Model                 = require("./model").createClass();
exports.Collection            = require("./collection").createClass();
exports.createModelClass      = require("./model").createClass;
exports.createCollectionClass = require("./collection").createClass;
exports.setVirtuals           = require("./set-virtuals");
exports.load                  = require("./load");
exports.singleton             = require("./singleton");
exports.save                  = require("./save");
exports.watchProperty         = require("./watch-property");
exports.bindProperty          = require("./bind-property");
exports.watchModelsMixin      = require("./watch-models-mixin");

/* istanbul ignore if */
if (process.browser) {
  global.Caplet = module.exports;
}
