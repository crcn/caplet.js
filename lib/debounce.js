
module.exports = function(fn, timeout) {
  if (!process.browser) return fn;
  var timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, timeout);
  };
};
