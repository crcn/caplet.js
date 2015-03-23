
function _hasChanged(from, to) {
    for (var key in from) {
        if (from[key] !== to[key]) return true;
    }
    return false;
}

module.exports = {

    /**
     */

    componentDidMount: function() {
        this._watchers = [];
        var self = this;
        var forceUpdate = this.forceUpdate.bind(this);
        for (var key in this.props) {
            var value = this.props[key];
            if (value && value.watch) {
                this._watchers.push(this.props[key].watch(forceUpdate));
            }
        }
    },

    /**
     */

    shouldComponentUpdate: function(nextProps, nextState) {
        return _hasChanged(this.props, nextProps) || 
        _hasChanged(nextProps, this.props)        ||
        _hasChanged(this.state, nextState)        ||
        _hasChanged(nextState, this.state);
    },

    /**
     */

    componentWillUnmount: function() {
        for (var i = this._watchers.length; i--;) {
            this._watchers[i].dispose();
        }
        this._watchers = void 0;
    }
}