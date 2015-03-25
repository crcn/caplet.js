var WatchableObject  = require("watchable-object");

module.exports = {
  get: function(keypath) {
    var ret = WatchableObject.prototype.get.call(this, keypath);
    if (ret != void 0) return ret;
    var missingProperty = (typeof keypath === "string" ? keypath.split(".") : keypath)[0];
    if (!this._missingProperties) this._missingProperties = {};
    if (this._missingProperties[missingProperty]) return;
    this._emitter.emit("missingProperty", this._missingProperties[missingProperty] = missingProperty);
    if (this[missingProperty] != void 0) return this.get(keypath);
  }
};