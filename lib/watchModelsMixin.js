

module.exports = {

    /**
     */

    componentDidMount: function() {
        this._watchers = [];
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

    componentWillUnmount: function() {
        for (var i = this._watchers.length; i--;) {
            this._watchers[i].dispose();
        }
        this._watchers = void 0;
    }
}