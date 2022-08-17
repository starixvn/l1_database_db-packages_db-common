
/**
 * 
 * @param {string} text 
 * @param {number} [tab=28] 
 * @returns {string}
 */
export function tabNL (text, tab = 28) {
  return text.replace(/\n/g, `\n${' '.repeat(tab)}`);
};

/**
 * 
 * @param {*} text 
 * @returns {boolean}
 */
export function isString (text) {
  if (typeof text === "string" || text instanceof String) return true;
  return false;
};

const StringUtils = Object.freeze({ tabNL, isString });
export default StringUtils;
