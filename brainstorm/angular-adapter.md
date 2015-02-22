```javascript

function controller($scope) {
  var person = new Person();
  person.on("change", $scope.apply.bind($scope));
  person.set("name", "Jeff");
  $scope.person = person;
}
```