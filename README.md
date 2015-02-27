# caplet.js

[![Build Status](https://travis-ci.org/mojo-js/caplet.js.svg)](https://travis-ci.org/mojo-js/caplet.js) [![Coverage Status](https://coveralls.io/repos/mojo-js/caplet.js/badge.svg?branch=master)](https://coveralls.io/r/mojo-js/caplet.js?branch=master) [![Dependency Status](https://david-dm.org/mojo-js/caplet.js.svg)](https://david-dm.org/mojo-js/caplet.js) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mojo-js/caplet.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

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
