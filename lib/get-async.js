var watchProperty = require("./watch-property");

module.exports = function(target, keypath, onLoad) {

  var watcher = watchProperty(target, keypath, function(value) {
    watcher.dispose();
    onLoad(void 0, value);
  });

  watcher.trigger();
};
