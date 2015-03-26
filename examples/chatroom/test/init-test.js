
var Application = require("../application");

beforeEach(function() {
  global.app = new Application({ _loadFixtures: function(){} });
});