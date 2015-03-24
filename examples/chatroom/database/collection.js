var sift = require("sift");

function DBCollection(modelCollectionClass) {
    this.modelCollectionClass = modelCollectionClass;
    this.modelClass           = modelCollectionClass.prototype.modelClass;
    this._items = [];
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

DBCollection.prototype.upsert = function(query, onFind) {
    // TODO
}

module.exports = DBCollection;