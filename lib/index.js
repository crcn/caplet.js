var Model      = require("./model");
var Collection = require("./collection");

exports.Model                 = Model.createClass();
exports.Collection            = Collection.createClass();
exports.createModelClass      = Model.createClass;
exports.createCollectionClass = Collection.createClass;
exports.setVirtuals           = require("./set-virtuals");
exports.load                  = require("./load");
exports.singleton             = require("./singleton");
exports.save                  = require("./save");
exports.watchProperty         = require("./watch-property");
exports.bindProperty          = require("./bind-property");
exports.watchModelsMixin      = require("./watch-models-mixin");
exports.getAsync              = require("./get-async");
exports.recycle               = require("./recycle");
exports.reference             = require("./reference");

/* istanbul ignore if */
if (process.browser) {
  global.Caplet = module.exports;
}
