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

DBCollection.prototype.find = function(query, onFind) {
    process.nextTick(function() {
        onFind(null, new this.modelCollectionClass({ data: sift(query, this._items) }));
    }.bind(this));
}

DBCollection.prototype.findOne = function(query, onFind) {
    process.nextTick(function() {
        var filtered = sift(query, this._items);
        if (!filtered.length) return onFind();
        onFind(null, new this.modelClass({ data: filtered[0] }));
    }.bind(this));
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