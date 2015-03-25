var extend = require("xtend/mutable");

module.exports = function(target, virtuals) {

  if (target.__virtuals) {
    return extend(target.__virtuals, virtuals);
  } else {
    target.__virtuals = virtuals;
  }

  function getVirtual (property) {
    if (target.__virtuals[property]) return target.__virtuals[property];
    if (target.__virtuals["*"]) return function(onLoad) {
      target.__virtuals["*"].call(this, property, onLoad);
    }
  }

  target._emitter.on("missingProperty", function(property) {

    var virtual = getVirtual(property);

    if (!virtual) return;
    virtual.call(target, function(err, value) {
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
