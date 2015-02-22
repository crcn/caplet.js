```javascript

var caplet = require("caplet");

var Friends = caplet.Collection.extend({
  createModel: function (properties) {
    return new Person(properties);
  },
  persist: {
    load: function (onLoad) {
      onLoad(null, [{ name: "ab" }]);
    }
  }
});


var Person = caplet.Model.extend({
  virtuals: {
    friends: function (onLoad) {
      new Friends({ person: this }).load(onLoad);
    }
  }
    
});
```

### TODO

- ReactJS integration
- AngularJS integration
