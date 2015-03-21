var WatchableObject  = require("watchable-object");
var FastEventEmitter = require("fast-event-emitter");
var watchProperty    = require("./watchProperty");
var setupVirtuals    = require("./setupVirtuals");


function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}


function Model(properties) {
    WatchableObject.call(this, isObject(properties) ? properties : { data: properties });
    this._emitter = new FastEventEmitter();
    setupVirtuals(this);
    watchProperty(this, "data", this._onDataChange.bind(this)).trigger();
}

WatchableObject.extend(Model, {

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
        var data = {}, target = this.data ? this.data : this;

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
    },

    /**
     */

    dispose: function() {
        WatchableObject.prototype.dispose.call(this);
        this._emitter.emit("dispose");
    }
});

Model.createClass = function (properties) {
    
    function ChildModel(properties) {

        if (!(this instanceof Model)) {
            return new ChildModel(properties);
        }

        Model.call(this, properties);
    };

    Model.extend(ChildModel, properties);
    return ChildModel;
}

module.exports = Model;