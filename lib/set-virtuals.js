var extend = require("xtend/mutable");

module.exports = function(target, virtuals) {

  if (target.virtuals) {
    return extend(target.virtuals, virtuals);
  } else {
    target.virtuals = virtuals;
  }

  target._emitter.on("missingProperty", function(property) {
    if (!(property in target.virtuals)) return;
    target.virtuals[property].call(target, function(err, value) {
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
