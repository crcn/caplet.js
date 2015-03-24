var WatchableObject  = require("watchable-object");
var FastEventEmitter = require("fast-event-emitter");
var watchProperty    = require("./watch-property");
var extend           = require("xtend");

/**
 */

function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 */

function Model(properties) {

  // only set props

  properties = isObject(properties) ? properties : { data: properties };
  if (this.getInitialProperties) properties = extend({}, this.getInitialProperties(), properties);

  WatchableObject.call(this, properties);

  this._emitter = new FastEventEmitter();

  watchProperty(this, "data", this.onDataChange.bind(this)).trigger();
  this.initialize();

  if (this.onChange) this.watch(this.onChange.bind(this));
}

/**
 */

WatchableObject.extend(Model, {

  /**
   */

  initialize: function() {
  },

  /**
   * deserialize data from the this.data
   */

  fromData: function(data) {
    return isObject(data) ? data : {};
  },

  /**
   * serialize this model back into a data object
   */

  toData: function() {
    var data   = {};
    var target = this.data ? this.data : this;

    if (!isObject(target)) {
      return target;
    }

    for (var key in target) {
      data[key] = target[key];
    }

    return data;
  },

  /**
   */

  equals: function(model) {
    return (this.uid && this.uid === model.uid) || this.data === model.data;
  },

  /**
   */

  toJSON: function() {
    return this.toData();
  },

  /**
   */

  onDataChange: function(data) {
    this.setProperties(this.fromData(data));
  },

  /**
   * asynchronous
   */

  get: function(keypath) {
    var ret = WatchableObject.prototype.get.call(this, keypath);
    if (ret != void 0) return ret;
    var missingProperty = (typeof keypath === "string" ? keypath.split(".") : keypath)[0];
    if (!this._missingProperties) this._missingProperties = {};
    if (this._missingProperties[missingProperty]) return;
    this._emitter.emit("missingProperty", this._missingProperties[missingProperty] = missingProperty);
  },

  /**
   */

  dispose: function() {
    WatchableObject.prototype.dispose.call(this);
    this._emitter.emit("dispose");
  }
});

var oldExtend = Model.extend;

Model.extend = function(properties) {

  var self = this;

  function ChildModel(properties) {

    if (!(this instanceof self)) {
      return new ChildModel(properties);
    }

    self.call(this, properties);
  }

  oldExtend.call(self, ChildModel, properties);
  ChildModel.extend = Model.extend;
  return ChildModel;
};

Model.createClass = Model.extend.bind(Model);

module.exports = Model;
