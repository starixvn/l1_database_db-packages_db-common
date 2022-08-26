import { isString } from "./string";

export const DURATION = Object.freeze({
  DEFAULT : 1000,
  MINUTE  : 1000 * 60,
  HOUR    : 1000 * 60 * 60,
  DAY     : 1000 * 60 * 60 * 24,
});

/**
 * @param {Date} time
 * @param {string} period
 * @returns {string} The formatted string of $time floored to $period
 */
export function format(time, period) {
  if (!(time instanceof Date)) throw TypeError(`$time must be a Date`);
  if (!isString(period)) throw TypeError(`$period must be a string`);

  const timeStr = time.toISOString();
  const periodStr = period.toUpperCase();

  switch (periodStr) {
    case 'DAY':
      return timeStr.replace(/T.*/, '');
    case 'HOUR':
      return timeStr.replace(/T([0-9]{2}).*/, ' $1:00:00');
    case 'MINUTE':
      return timeStr.replace(/T([0-9]{2}:[0-9]{2}).*/, ' $1:00');
    case 'DEFAULT':
      return timeStr.replace(/T([0-9]{2}:[0-9]{2}:[0-9]{2}).*/, ' $1');
    default:
      return timeStr;
  };
};

/**
 * @param {string} period
 * @returns {number} The number of milliseconds the $period contains
 */
export function getPeriod(period) {
  if (!isString(period)) throw TypeError(`$period must be a string`);

  const periodStr = period.toUpperCase();

  /** Return default period if got invalid value */
  return DURATION[periodStr] ?? DURATION.DEFAULT;
};

/**
 * @param {*} input
 * @returns {number} The epoch value of $input
 */
export function parseEpoch(input) {
  /** Epoch is the value of Date object */
  if (input instanceof Date) return input.valueOf();

  /** Treat all numbers as epoch value */
  if (typeof input === "number") return input;

  /** Using Date.parse for the rest */
  return Date.parse(input);
};

/**
 * @param {*} time
 * @param {string} period
 * @returns {Date} The lower bound Date of the $period that contains the input $time
 */
export function round(time, period) {
  const timeEpoch = parseEpoch(time);
  const periodVal = getPeriod(period);

  return new Date(Math.floor(timeEpoch / periodVal) * periodVal);
};

const DateUtils = Object.freeze({ DURATION, format, getPeriod, parseEpoch, round });
export default DateUtils;
