
/**
 */

function PropertyWatcher (target, property, listener, immediate) {
  this.target   = target;
  this.listener = listener;
  this.property = property;
  this.immediate = !!immediate; // secret flag for internal use only!
  this.oldValue = void 0;
  var self = this;
  this._disposable = this._watch(this.target, function() {
    self.trigger();
  });
}

/**
 */

PropertyWatcher.prototype.trigger = function(force) {

  var currentValue = this.target.get(this.property);
  if (force !== true && this.oldValue === currentValue) {
    return this;
  }

  if (this._valueWatcher) this._valueWatcher.dispose();

  if (currentValue && currentValue.__isWatchableObject) {
    var self = this;
    this._valueWatcher = this._watch(currentValue, function() {
      self.trigger(true);
    });
  }

  this.oldValue = currentValue;
  this.listener.call(this.target, currentValue, this.oldValue);

  return this;
};

/**
 */

PropertyWatcher.prototype._watch = function(target, listener) {
  if (this.immediate) {
    return target.on("willChange", listener);
  } else {
    return target.watch(listener);
  }
};

/**
 */

PropertyWatcher.prototype.dispose = function() {
  if (this._valueWatcher) this._valueWatcher.dispose();
  this._disposable.dispose();
  return this;
};

/**
 */

module.exports = function(target, property, listener, immediate) {
  return new PropertyWatcher(target, property, listener, immediate);
};
