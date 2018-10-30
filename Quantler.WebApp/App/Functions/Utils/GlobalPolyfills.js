Object.isObject = function (value) {
  return (value
  && value.constructor
  && value.constructor === Object)
}

Object.deepExtendMultable = function deepExtendMultable (destination, source) {
  for (let property in source) {
    if (Object.isObject(source[property])) {
      destination[property] =
        Object.isObject(destination[property])
          ? destination[property]
          : {}

      deepExtendMultable(destination[property], source[property])
    }
    else {
      destination[property] = source[property]
    }
  }

  return destination
}

Object.deepExtend = function (destination, source) {
  return Object.deepExtendMultable(
    Object.deepExtendMultable({}, destination), source)
}
