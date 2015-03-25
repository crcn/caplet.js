var extend = require("xtend/mutable");

module.exports = function(target, virtuals) {

  if (target.__virtuals) {
    return extend(target.__virtuals, virtuals);
  } else {
    target.__virtuals = virtuals;
  }

  target._emitter.on("missingProperty", function(property) {
    if (!(property in target.__virtuals)) return;
    target.__virtuals[property].call(target, function(err, value) {
      if (err) return target._emitter.emit("error", err);

      /* istanbul ignore else */
      if (!process.browser) {
        target.set(property, value);
      } else {
        process.nextTick(function() {
          target.set(property, value);
        });
      }
    });
  });
};
