module.exports = function(target, create, update, onSave) {
  if (!onSave) onSave = function(){ };
  if (target.uid) {
    return update.call(target, onSave);
  } else {
    return create.call(target, onSave);
  }
};
