module.exports = function(target, create, update) {
  if (target.uid) {
    return update.call(target);
  } else {
    return create.call(target);
  }
};
