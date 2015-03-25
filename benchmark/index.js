var Benchmark = require("benchmark");
var caplet    = require("..");

var suite = new Benchmark.Suite;

var ChildModel      = caplet.createModelClass();
var ChildCollection = caplet.createCollectionClass();


function clazz() {

}


suite
.add('new Model()', function() {
  new caplet.Model();
})
.add('Model()', function() {
  caplet.Model();
})
.add('new ChildModel()', function() {
  new ChildModel();
})
.add('ChildModel()', function() {
  ChildModel();
})
.add('new Collection()', function() {
  new caplet.Collection();
})
.add('Collection()', function() {
  caplet.Collection();
})
.add('new ChildCollection()', function() {
  new ChildCollection();
})
.add('ChildCollection()', function() {
  ChildCollection();
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run();