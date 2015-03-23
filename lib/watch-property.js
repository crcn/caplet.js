

module.exports = function(target, property, listener) {

    var oldValue, disposable;

     var watcher = {
        trigger: function() {
            var currentValue = target.get(property);
            if (oldValue === currentValue) {
                return watcher;
            }
            oldValue = currentValue;
            listener(currentValue, oldValue);
            return watcher;
        },
        dispose: function() {
            disposable.dispose();
            return watcher;
        }
    };

    disposable = target.watch(watcher.trigger);

    return watcher;
}