var sift  = require("sift");
var store = process.browser ? require("store") : {
    get: function(key) {
    },
    set: function(key, value) {
    }
};

var uid = String(Date.now() + "_" + Math.round(Math.random() * 99999999));

function DBCollection(name, modelCollectionClass) {

    this.modelCollectionClass = modelCollectionClass;
    this.modelClass           = modelCollectionClass.prototype.modelClass;
    this.name                 = name;

    this._items = [];
    this._i     = 0;
}

DBCollection.prototype.all = function(query, onFind) {
    var collection = new this.modelCollectionClass();
    process.nextTick(function() {
        collection.set("data", this._items);
        if (onFind) onFind(null, collection);
    }.bind(this));
    return collection;
}

DBCollection.prototype.find = function(query, onFind) {
    var collection = new this.modelCollectionClass();
    process.nextTick(function() {
        collection.set("data", sift(query, this._items));
        if (onFind) onFind(null, collection);
    }.bind(this));
    return collection;
}

DBCollection.prototype.findOne = function(query, onFind) {

    if (onFind && onFind.watch) {
        var model = onFind;
        onFind = void 0;
    } else {
        var model = new this.modelClass();
    }

    if (!onFind) onFind = function() { };

    process.nextTick(function() {
        var filtered = sift(query, this._items);
        if (!filtered.length) return onFind();
        model.set("data", filtered[0]);
        onFind(null, model);
    }.bind(this));
    return model;
}

DBCollection.prototype.save = function(model, onSave) {

    var oldData = sift({uid:model.uid}, this._items).shift();

    if (oldData) {
        this._items.splice(this._items.indexOf(oldData), 1, model.data);
    } else {
        model.uid = uid + "_" + (this._i++);
        this._items.push(model.toData());
    }

    if (onSave) onSave(void 0, model);
}


module.exports = DBCollection;