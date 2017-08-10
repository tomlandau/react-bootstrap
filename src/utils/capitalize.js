/**
 * Capitalizes a string.
 * @name capitalize
 * @param {string} string
 * @returns {string}
 * @example
 * ```js
 * capitalize(word) => Word
 * capitalize(utils) => Utils
 * capitalize(Already) => Already
 * capitalize(two words) => Two words
 * ``` 
 */
export default function capitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}
