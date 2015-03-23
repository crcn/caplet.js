

module.exports = function(target, property, listener) {

    var oldValue, disposable;

     var watcher = {
        trigger: function() {
            var currentValue = target.get(property);
            if (oldValue === currentValue) {
                return;
            }
            oldValue = currentValue;
            listener(currentValue, oldValue);
        },
        dispose: function() {
            disposable.dispose();
        }
    };

    disposable = target.watch(watcher.trigger);

    return watcher;
}