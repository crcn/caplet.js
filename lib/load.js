var singleton = require("./singleton");

module.exports = function(target, load, onLoad) {
  singleton(target, "load", load, function(err, data) {
    if (err) return onLoad(err);
    target.set("data", data);
    onLoad(null, target);
  });
};
