var Model         = require("./model");
var watchProperty = require("./watch-property");

module.exports = function(target, keypath) {
  var ref = new Model({ value: target.get(keypath) });
  watchProperty(target, keypath, ref.set.bind(ref, "value"));
  watchProperty(ref, "value", target.set.bind(target, "value"));
  return ref;
};
