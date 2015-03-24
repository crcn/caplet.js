module.exports = function(target, property, load, onLoad) {
    if (!target._singletons) target._singletons = {};
    var event = "singleton:" + property;
    target._emitter.once(event, onLoad || function(){});
    var singleton = target._singletons[property];
    if (singleton != void 0) return singleton;

    target._singletons[property] = singleton = {
        dispose: function() {
            target._singletons[property] = void 0;
        }
    };

    load(function(err, value) {
        target._emitter.emit.apply(target._emitter, [event, err, value]);
    });

    return singleton;
};