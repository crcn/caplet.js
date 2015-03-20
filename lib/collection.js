var WatchableObject  = require("watchable-object");
var FastEventEmitter = require("fast-event-emitter");
var watchProperty    = require("./watchProperty");
var setupVirtuals    = require("./setupVirtuals");
var Model            = require("./model");

function Collection(properties) {

    WatchableObject.call(this, properties);
    this._emitter = new FastEventEmitter();
    this.models = [];
    this._modelsByUID = {};
    setupVirtuals(this);
    watchProperty(this, "data", this._onDataChange.bind(this)).trigger();
    watchProperty(this, "source", this._onSourceChange.bind(this)).trigger();

}

WatchableObject.extend(Collection, {

    /**
     */

    modelClass: Model,

    /**
     */

    createModel: function(properties) {
        return new Model(properties);
    },

    /**
     * deserialize data from the this.data
     */

    fromData: function(data) {
        return {
            source: data
        };
    },

    /**
     */

    toData: function() {
        return this.source;
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
     */

    _onSourceChange: function(source) { 

        var models = this.models;

        // for (var i = 0, n = source.length; i < n; i++) {
        //     var model = this.createModel({ data: source[i] });
        //     if (this._modelsByUID[model.uid]) {
        //         continue;
        //     }
        //     models.unshift(model);
        // }

        // // 
        // models.splice(i, models.length);
    }
});

Collection.createClass = function (properties) {

    function constructor(properties) {

        if (!(this instanceof Collection)) {
            return new constructor(properties);
        }

        Collection.call(this, properties);
    };

    var ChildCollection = Collection.extend(constructor, properties);
    return ChildCollection;
}

module.exports = Collection;