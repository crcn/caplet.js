var WatchableObject      = require("watchable-object");
var watchProperty        = require("./watch-property");
var extend               = require("xtend/mutable");
var missingPropertyMixin = require("./missing-property-mixin");
var _mixin               = require("./_mixin");

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

  var self = this;

  watchProperty(this, "data", this.onDataChange).trigger();

  this.initialize();

  if (this.onChange) this.watch(function() {
    self.onChange();
  });
}

/**
 */

WatchableObject.extend(Model, {

  /**
   */

  initialize: function() { },

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

    if (this.data && !isObject(this.data)) {
      return this.data;
    }

    var keys   = Object.keys(this.data ? this.data : this);

    for (var i = 0, n = keys.length; i < n; i++) {
      var key = keys[i];

      if (key in this.constructor.prototype || key.charCodeAt(0) === 95) {
        continue;
      }

      data[key] = this[key];
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

  get: missingPropertyMixin.get,

  /**
   */

  dispose: function() {
    WatchableObject.prototype.dispose.call(this);
    this.emit("dispose");
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

  if (properties && properties.mixins) {
    properties = _mixin([properties].concat(properties.mixins));
  }

  oldExtend.call(self, ChildModel, properties);
  ChildModel.extend = Model.extend;
  return ChildModel;
};

Model.createClass = Model.extend.bind(Model);

module.exports = Model;
