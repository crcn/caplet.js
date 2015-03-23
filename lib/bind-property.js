var watchProperty = require("./watch-property");

module.exports = function(fromTarget, fromProperty, toTarget, toProperty) {
    if (!toProperty) toProperty = fromProperty;

    var watcher = watchProperty(fromTarget, fromProperty, function(value) {
        toTarget.set(toProperty, value);
    });

    return watcher;
}