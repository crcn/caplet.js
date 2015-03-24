## Caplet.js

Caplet is a tiny (11kb) modeling library.

[![Build Status](https://travis-ci.org/mojo-js/caplet.js.svg)](https://travis-ci.org/mojo-js/caplet.js) [![Dependency Status](https://david-dm.org/mojo-js/caplet.js.svg)](https://david-dm.org/mojo-js/caplet.js) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mojo-js/caplet.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Caplet is the M in "MVC". It works independently from any other library, and can easily be used with your existing framework/view layer such as [AngularJS](https://angularjs.org/), [ReactJS](http://facebook.github.io/react/), [RactiveJS](http://www.ractivejs.org/), or [PaperclipJS](http://paperclipjs.com) (shameless plug).

<!--
Caplet doesn't really implement new concepts. In fact, it's been inspired by a flury of other well-established frameworks such as [MongooseJS](http://mongoosejs.com/), and [EmberJS](http://mongoosejs.com/).
-->

<!-- stuff on familiarity here -->

Caplet doesn't make any assumptions about your code. It just gives organization to your model relationships in a sane way. It also gives you a relatively higher level of encapsulation for your data, while also encouraging you, but not forcefuly, to follow design patterns that scale quite well.

Caplet has been an evolution of many libraries in the past, which have been used in a few pretty large applications (30k-ish loc). The first version came about sometime around 2013 as [mojo-models](https://github.com/mojo-js/mojo-models), and has since been further generalized for all intensive purposes.
 
The newer, hip version of Caplet has been designed for React, and pairs wells with the Hierarchial nature of React-based applications.

Caplet can be a great companion to Flux. It also serves as a Flux alternative if you enjoy the good 'ol (and well proven when done right) MVC approach (Caplet (M) + React (VC)).


#### Why?

- Scales. Concepts have been used in various apps consisting of ~30k LOC.
- Simple. You just have models & collections. Nothing else to learn.
- Familiar. Caplet isn't too inventive. If you're familiar with Symphony, Mongoose, or Ember, then Caplet shouldn't be tough to learn.
- Obvious. It's easier to reconsile how your application should be structured if the only thing you have to deal with are `models` & `collections`. 
- Encapsulated. Caplet was design to encourage you to focus how your models & collections relate to one other versus how they relate to other parts of your application - this includes views, and even the API. This allows you to:
 - Re-use your models for other applications - web/desktop/server-side.
 - Maintain your model structure even if the API changes.
 - Write your front-end in parallel with your API.
- Lightweight. Caplet is small (11 KB minified).
- Extensible. 
- Testable. 

<!--
no singletons
-->


#### Installation

```
npm install caplet
```

#### Examples

- [React TODOMVC](https://github.com/crcn/react-caplet-todomvc)

#### Basic Example

```javascript
var Caplet = require("../../lib");
var React  = require("react");

/**
 */

var TodoModel = Caplet.createModelClass({
});

/**
 */

var TodoCollection = Caplet.createCollectionClass({
    modelClass: TodoModel
});

/**
 */

var TodoComponent = React.createClass({
    mixins: [Caplet.watchModelsMixin],
    render: function() {
        return <li><a href="#" onClick={this.props.todo.dispose.bind(this.props.todo)}>x</a> {this.props.todo.text}</li>
    }
}); 

/**
 */

var TodosComponent = React.createClass({
    mixins: [Caplet.watchModelsMixin],
    handleKeyDown: function(event) {
        if (event.keyCode !== 13) return;
        this.props.todos.create({ text: this.refs.todoText.getDOMNode().value });
    },
    render: function() {
        return <div>
            <input type="text" ref="todoText" onKeyDown={this.handleKeyDown} />
            <ul>{ this.props.todos.map(function(todo) {
                return <TodoComponent todo={todo} />;
            })}</ul>
        </div>
    }
}); 

/**
 */

React.render(<TodosComponent todos={ TodoCollection({
    data: [{ text: "drive car" }, { text: "wash car" }]
})} />, document.body);
```

### API

#### Model Caplet.createModelClass(properties)

creates a new model class

#### Model()

creates a new model

```javascript
var model = new Model(); // this is valid
var model = Model();     // you can also omit the "new" keyword
```

#### Model.initialize()

called when the model is instantiated

```javascript
var Model = Caplet.createModelClass({
    initialize: function() {
        // initialize stuff here
    }
});

Model(); // initialize() called
```

#### Model.fromData(data)

called when the data property is set. This method deserializes data and sets the returned
object as properties on the model.

> Note that `uid` should be set for an existing model

```javascript

var Address = Caplet.createModelClass({
    // impl here   
});

var Person = Caplet.createModelClass({
   fromData: function(data) {
        return {
            uid       : data._id,
            firstName : data.firstName,
            lastName  : data.lastName,
            address   : Address({ data: data.address })
        };
   }
});

var person = Person({
    data: {
        _id       : "dbId",
        firstName : "Jeff",
        lastName  : "Gordon",
        address   : {
            city  : "San Francisco",
            state : "CA",
            zip   : 94114
        }
    }
});

console.log(person.firstName); // Jeff
console.log(person.lastName);  // Gordon
console.log(person.address);   // [object Address]
console.log(person.data);      // data prop
```

#### Model.toData()

Serializes the model back into data.

```javascript
var Person = Caplet.createModelClass({
   toData: function(data) {
        return {
            _id       : this.uid,
            firstName : this.firstName,
            lastName  : this.lastName,
            address   : this.address ? this.address.toData() : void 0
        };
   }
});
````

#### Model.onDataChange(newData, oldData)

called when the `data` property changes

#### Model.toJSON()

calls `toData()`

#### Model.get(property)

returns a property

#### Model.set(property, value)

sets a property value

#### Model.data

unserialized data on the model

#### Model.setProperties(properties)

sets multiple property values

#### disposable Model.watch(listener)

watches the model for any changes

```javascript
var m = new Caplet.Model({ name: "Oprah" });
m.watch(function() {
    console.log("changed!");
});
m.set("name", "Ryan"); // triggers watcher
```

#### Model.dispose()

disposes the model - also removes it from a collection if it's in one

#### Collection Caplet.createCollectionClass(properties)

creates a new collection class

#### Collection()

creates a new collection

```javascript
var collection = new Collection(); 
var collection = Collection();    
```

#### Collection.initialize()

called when the collection is created

#### Collection.fromData(data)

deserializes properties on the collection. This is already set, but you can easily override it.

```javascript
var People = Caplet.createCollectionClass({
    fromData: function(data) {
        return {
            anotherProp: "blah",
            source: data.source.map(function(data) {
                return this.createModel({ data: data });
            }.bind(this))
        };
    }
});
```

#### Collection.onDataChange(newData, oldData)

called when the `data` property changes

#### Collection.modelClass

The model class to instantiate for each data item

```javascript
var Person = Caplet.createModelClass();
var People = Caplet.createCollectionClass({
    modelClass: Person
});

var people = People({ data: [{ name: "Ben"}, { name: "Carmen" }]});
console.log(people.at(0)); // [object Person]
```

#### Collection.source

the source of the collection

#### Collection.create(properties)

creates a new model & adds to the collection

```javascript
var Person = Caplet.createModelClass();
var People = Caplet.createCollectionClass({
    modelClass: Person
});

var people = People();
var person = people.create({ name: "Gordon" });

console.log(people.length); // 1
```

#### Collection.onChange()

override this if you want to listen for any changes on the collection 

```javascript
var Todo = Caplet.createModelClass({
    toggleComplete: function() {
        this.set("complete", !this.complete);
    }
});

var Todos = Caplet.createCollectionClass({
    modelClass: Todo,
    getInitialProperties: function() {
        return {
            allComplete: this._isAllComplete();
        }
    },
    onChange: function() {
        this.setProperties(this.getInitialProperties());
    },
    _isAllComplete: function() {
        for (var i = this.length; i--;) if (!this.at(i).complete) return false;
        return true;
    }
});

var todos = Todos({
    data: [ 
        { text: "wash car" },
        { text: "buy groceries", "complete": true }
    ]
});

console.log(todos.allComplete); // false
todos.at(0).set("complete", true);
console.log(todos.allComplete); // true
```

#### Collection.at(index)

returns a model at the given index

#### Collection.filter(fn)

filters the collection

#### Collection.push(model)

pushes a model onto the collection

#### Collection.unshift(model)

unshifts a mdoel

#### Collection.splice(index, numToRemove[, ...replace])

Removes / replaces items in the collection

#### Collection.map(fn)

maps & returns values

#### Collection.source

source of the collection (array of models)

#### Collection.data

raw unserialized data

### Helpers

#### Caplet.setVirtuals(target, virtuals)

Sets virtual properties which get called on demand

```javascript

var People = Caplet.createCollectionClass({
    load: function() {
        Caplet.load(this, function(next) {
            $.get(this.person ? "/people/" + this.person.uid + "/friends" : "/people", next);
        })
    }
});


var Person = Caplet.createModelClass({
    initialize: function() {
        Caplet.setVirtuals(this, {
            friends: function(onLoad) {
                People({ person: this }).load(onLoad);
            }
        })
    }
});

var person = Person({ uid: "personId" });
person.watch(function() {
    console.log(person.get("people")); // should be defined
});
person.get("people"); // trigger virtual property

```

#### Caplet.watchProperty(target, property, listener)

watches a property on the model or collection

#### Caplet.load(target, load, onLoad)

```javascript
var Person = Caplet.createModelClass({
    load: function(onLoad) {
        Caplet.load(this, function(onLoad) {
            $.get("/people/" + this.uid, onLoad);
        }, onLoad);
    }
})
```

#### Caplet.watchModelsMixin

React mixin which automatically watches properties on a component & triggers a re-render
if anything changes


