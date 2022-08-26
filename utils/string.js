/**
 * @param {*} text
 * @returns {boolean} Indicate if the $text is string or not
 */
export function isString(text) {
  if (typeof text === "string" || text instanceof String) return true;
  return false;
};

/**
 * @param {string} text
 * @param {number} [tab=28]
 * @returns {string} String that every new line is indented
 */
export function tabNL(text, tab = 28) {
  return text.replace(/\n/g, `\n${' '.repeat(tab)}`);
};

const StringUtils = Object.freeze({ isString, tabNL });
export default StringUtils;
