# caplet.js

[![Build Status](https://travis-ci.org/mojo-js/caplet.js.svg)](https://travis-ci.org/mojo-js/caplet.js) [![Dependency Status](https://david-dm.org/mojo-js/caplet.js.svg)](https://david-dm.org/mojo-js/caplet.js)

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

- ReactJS adapter
- AngularJS adapter
