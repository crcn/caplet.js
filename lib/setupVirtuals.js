module.exports = function(target) {

    if (!target.virtuals) return;

    target._emitter.on("missingProperty", function(property) {
        if (!(property in target.virtuals)) return;
        target.virtuals[property].call(target, function(err, value) {
            if (err) return target._emitter.emit("error", err);

            // for testing
            if (!process.browser) return target.set(property, value);

            // enforce async
            process.nextTick(function() {
                target.set(property, value);
            });
        });
    });
}