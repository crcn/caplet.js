var extend = require("xtend/mutable");

/**
 */

module.exports = function(mixins) {
  var prototype = {};

  for (var i = 0, n = mixins.length; i < n; i++) {

    var mixin = mixins[i];
    var keys  = Object.keys(mixin);

    for (var j = 0, n2 = keys.length; j < n2; j++) {
      var key   = keys[j];
      var value = mixin[key];
      var tov   = typeof value;

      if (tov === "function") {
        if (prototype[key]) {
          value = combineFunction(prototype[key], value);
        }
      }

      prototype[key] = value;
    }
  }

  return prototype;
};

/**
 */

function combineFunction(oldFn, newFn) {
  return function() {
    return extend(oldFn.apply(this, arguments) || {}, newFn.apply(this, arguments) || {});
  };
}
