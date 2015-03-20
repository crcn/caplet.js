var WatchableObject  = require("watchable-object");
var FastEventEmitter = require("fast-event-emitter");
var watchProperty    = require("./watchProperty");
var setupVirtuals    = require("./setupVirtuals");


function Model(properties) {

    WatchableObject.call(this, properties);
    this._emitter = new FastEventEmitter();
    setupVirtuals(this);
    watchProperty(this, "data", this._onDataChange.bind(this)).trigger();
}

WatchableObject.extend(Model, {

    /**
     * deserialize data from the this.data
     */

    fromData: function(data) {
        return data;
    },

    /**
     * serialize this model back into a data object
     */

    toData: function() {
        var data = {}, target = this.data ? this.data : this;

        for (var key in target) {
            data[key] = target[key];
        }

        return data;
    },

    /**
     */

    toJSON: function() {    
        return this.toData();
    },

    /**
     */

    _onDataChange: function(data) {
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
    }
});

Model.createClass = function (properties) {
    
    function constructor(properties) {

        if (!(this instanceof Model)) {
            return new constructor(properties);
        }

        Model.call(this, properties);
    };

    var ChildModel = Model.extend(constructor, properties);
    return ChildModel;
}

module.exports = Model;