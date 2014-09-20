/* For debugging only */

var methods = [];

var loggingWrapper = function(method, message) {
  var id = methods.length;

  var func = function(target, args) {
    var method = methods[id];

    try {
      console.log("Before " + message + ": " + args);
      method.apply(target, args);
    }
    finally {
      console.log("After " + message + ": " + args);
    }
  }

  methods.push(method);

  return func;
}

module.exports = function(target, method, args) {
  var methodId = methods.length,
      message  = arguments[3] || '';

  return loggingWrapper(method, message)(target, args);
};