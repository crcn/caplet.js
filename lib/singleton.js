module.exports = function(target, property, load, onLoad) {
    if (!target._singletons) target._singletons = {};
    var event = "singleton:" + property;
    target._emitter.once(event, onLoad);
    if (target._singletons[property]) return;
    target._singletons[property] = 1;
    load(function(err, value) {
        target._emitter.emit.apply(target._emitter, [event, err, value]);
    })
}