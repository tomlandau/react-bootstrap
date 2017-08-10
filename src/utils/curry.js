/**
 * # Turns a function into a curried function.
 * If the curried function recieves a component as the last argument, it will execute.
 * Otherwise, It will return another function that expects only a component. 
 * That function will execute the orignal one with the original arguments, plus the component.
 * @bit
 * @name curry
 * @param {function}
 * @returns {function}
 *
 */
function curry(fn) {
  return (...args) => {
    let last = args[args.length - 1];
    if (typeof last === 'function') {
      return fn(...args);
    }
    return Component => fn(...args, Component);
  };
}

export default curry;