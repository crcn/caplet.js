
/**
 */

function PropertyWatcher (target, property, listener) {
  this.target   = target;
  this.listener = listener;
  this.property = property;
  this.oldValue = void 0;
  var self = this;
  this._disposable = this.target.watch(function() {
    self.trigger();
  });
}

/**
 */

PropertyWatcher.prototype.trigger = function() {

  var currentValue = this.target.get(this.property);
  if (this.oldValue === currentValue) {
    return this;
  }

  this.oldValue = currentValue;
  this.listener(currentValue, this.oldValue);

  return this;
};

/**
 */

PropertyWatcher.prototype.dispose = function() {
  this._disposable.dispose();
  return this;
};

/**
 */

module.exports = function(target, property, listener) {
  return new PropertyWatcher(target, property, listener);
};
