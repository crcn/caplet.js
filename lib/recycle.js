module.exports = function(value, clazz, properties) {

  if (value instanceof clazz) {
    value.setProperties(properties);
  } else {
    value = new clazz(properties);
  }

  return value;
};
