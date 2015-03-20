var WatchableObject = require("watchable-object");
var watchProperty   = require("./watchProperty");

function Model(properties) {
    WatchableObject.call(this, properties);
    watchProperty(this, "data", this._onDataChange.bind(this)).trigger();
}

WatchableObject.extend(Model, {

    /**
     */

    fromData: function(data) {
        return data;
    },

    /**
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
    }
});

Model.createClass = function (properties) {
    var ChildModel = Model.extend(properties);
    return ChildModel;
}

module.exports = Model;