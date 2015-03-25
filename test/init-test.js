var ReactTools = require("react-tools");
var fs         = require("fs");
var path       = require("path");

// Install the compiler.
require.extensions[".jsx"] = function(module, filename) {
  source = ReactTools.transform(fs.readFileSync(filename, "utf8"));
  return module._compile(source);
};
