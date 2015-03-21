var WatchableCollection = require("watchable-collection");
var FastEventEmitter    = require("fast-event-emitter");
var watchProperty       = require("./watchProperty");
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
    this._onDataChange = this._onDataChange.bind(this);
    this._emitter = new FastEventEmitter();
    this.models = [];
    this._modelsByUID = {};

    watchProperty(this, "data", this._onDataChange).trigger();
    this.watch(this._watchModels.bind(this));
    if (this.didChange) this.watch(this.didChange.bind(this));
    this._watchModels();
    this.initialize();

}

WatchableCollection.extend(Collection, {

    /**
     */

    modelClass: Model,

    /**
     */

    initialize: function() {

    },

    /**
     */

    createModel: function(properties) {
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
    },

    /**
     */

    _watchModels: function() {
        this._unwatchModels();
        this._modelListeners = [];
        var onChange = this._onChange.bind(this);

        this.source.forEach(function(model) {
            this._modelListeners.push(model.watch(onChange));
            this._modelListeners.push(model._emitter.once("dispose", function() {
                this.splice(this.indexOf(model), 1);
            }.bind(this)));
        }.bind(this));
    },

    /**
     */

    _unwatchModels: function() {
        if (!this._modelListeners) return;
        for (var i = this._modelListeners.length; i--;) {
            this._modelListeners[i].dispose();
        }
        this._modelListeners = void 0;
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