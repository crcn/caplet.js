

```javascript

var CapletMixin = {
  componentWillMount: function() {
    this._watchers = [];
    for (var key in this.props) {
      var v = this.props[key];
      if (v.__isModel) {
        this._watchers.push(v.on("change"), this.forceUpdate.bind(this));
        v.load();
      }
    }
  },
  componentWillUnmount: function() {
    for (var i = this._watchers; i--;) this._watchers[i].dispose();
  }
};


var PeopleListView = React.createComponent({
    mixins: [CapletMixin],
    render: function () {
      return <ul>{
        this.props.people.map(function (person) {
          return <li>{ person.name }</li>;
        })
      }</ul>;
    }
});
```