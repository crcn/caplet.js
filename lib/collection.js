var WatchableCollection = require("watchable-collection");
var FastEventEmitter    = require("fast-event-emitter");
var watchProperty       = require("./watchProperty");
var setupVirtuals       = require("./setupVirtuals");
var Model               = require("./model").createClass();

function Collection(sourceOrProperties) {

    var properties = {};

    if (!sourceOrProperties) sourceOrProperties = {};

    if (Object.prototype.toString.call(sourceOrProperties) === "[object Array]") {
        properties.source = sourceOrProperties;
    } else {
        properties = sourceOrProperties;
    }

    WatchableCollection.call(this);
    this.setProperties(properties);
    this.createModel = this.createModel.bind(this);
    this._emitter = new FastEventEmitter();
    this.models = [];
    this._modelsByUID = {};

    setupVirtuals(this);
    watchProperty(this, "data", this._onDataChange.bind(this)).trigger();

}

WatchableCollection.extend(Collection, {

    /**
     */

    modelClass: Model,

    /**
     */

    createModel: function(properties) {
        properties.collection = this;
        return new this.modelClass(properties);
    },

    /**
     */

    create: function(properties) {
        var model = this.createModel(properties);
        
        if (!properties.waitUntilSave) {
            this.push(model);
        }

        return model;
    },

    /**
     * deserialize data from the this.data
     */

    fromData: function(data) {
        var self = this;
        return {
            source: (data || []).map(function(data) {
                return self.createModel({ data: data })
            })
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

        var properties = this.fromData(data);
        var nsource    = properties.source;

        // change back the source
        var csource = this.source.concat();

        for (var i = nsource.length; i--;) {
            var amodel = nsource[i];

            for (var j = csource.length; j--;) {
                var bmodel = csource[j];
                if (amodel.equals(bmodel)) {
                    bmodel.set("data", amodel.toData());
                    nsource.splice(i, 1, bmodel); // use existing model - resort
                    break;
                }
            }
        }

        this.setProperties(properties);
    }
});

Collection.createClass = function (properties) {

    function ChildCollection(properties) {

        if (!(this instanceof Collection)) {
            return new ChildCollection(properties);
        }

        Collection.call(this, properties);
    };

    Collection.extend(ChildCollection, properties);
    return ChildCollection;
}

module.exports = Collection;