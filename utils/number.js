/**
 * @param {*} input
 * @returns {boolean} Indicate if the $input is number or not
 */
export function isNumber(input) {
  if (typeof input === "number" || typeof input.valueOf() === "number") return true;
  return false;
};

const NumberUtils = Object.freeze({ isNumber });
export default NumberUtils;
