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
    };
  }

  target.on("missingProperty", function(property) {

    var virtual = getVirtual(property);

    if (!virtual) return;

    function onLoad(err, value) {
      if (err) return target.emit("error", err);

      /* istanbul ignore else */
      if (!process.browser) {
        target.set(property, value);
      } else {
        process.nextTick(function() {
          target.set(property, value);
        });
      }
    }

    var value = virtual.call(target, onLoad);
    if (value != void 0) onLoad(void 0, value);
  });
};
