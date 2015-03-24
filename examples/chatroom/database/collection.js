var sift = require("sift");

var uid = String(Date.now() + "_" + Math.round(Math.random() * 99999999));

function DBCollection(modelCollectionClass) {
    this.modelCollectionClass = modelCollectionClass;
    this.modelClass           = modelCollectionClass.prototype.modelClass;

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

DBCollection.prototype.insert = function(data, onFind) {
    data._id = uid + (this._i++);
    this._items.push(data);
    onFind(void 0, data);
}

DBCollection.prototype.update = function(query, data, onFind) {
    var item = sift(query, this._items).shift();
    if (!item) return onUpdate();
    this._items.splice(this._items.indexOf(item), 1, data);
    onFind(void 0, data);
}

module.exports = DBCollection;