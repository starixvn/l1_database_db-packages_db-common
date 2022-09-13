export enum PERIOD {
  DAY     = 'DAY',
  HOUR    = 'HOUR',
  MINUTE  = 'MINUTE',
  DEFAULT = 'DEFAULT',
}

export const DURATION = Object.freeze({
  [PERIOD.DAY]      : 1000 * 60 * 60 * 24,
  [PERIOD.HOUR]     : 1000 * 60 * 60,
  [PERIOD.MINUTE]   : 1000 * 60,
  [PERIOD.DEFAULT]  : 1000,
});

/**
 * @param {Date} time
 * @param {PERIOD} period
 * @returns {string} The formatted string of $time floored to $period
 */
export function format(time: Date, period: string): string {
  const timeStr = time.toISOString();
  const periodStr = period.toUpperCase() as PERIOD;

  switch (periodStr) {
    case PERIOD.DAY:
      return timeStr.replace(/T.*/, '');
    case PERIOD.HOUR:
      return timeStr.replace(/T([0-9]{2}).*/, ' $1:00:00');
    case PERIOD.MINUTE:
      return timeStr.replace(/T([0-9]{2}:[0-9]{2}).*/, ' $1:00');
    case PERIOD.DEFAULT:
      return timeStr.replace(/T([0-9]{2}:[0-9]{2}:[0-9]{2}).*/, ' $1');
    default:
      return timeStr;
  };
};

/**
 * @param {string} period
 * @returns {number} The number of milliseconds the $period contains
 */
export function getPeriod(period?: string): number {
  const periodStr = period?.toUpperCase() as PERIOD;

  /** Return default period if got invalid value */
  return period ? DURATION[periodStr] : DURATION.DEFAULT;
};

/**
 * @param {number | string | Date} input
 * @returns {number} The epoch value of $input
 */
export function parseEpoch(input: number | string | Date): number {
  /** Epoch is the value of Date object */
  if (input instanceof Date) return input.valueOf();

  /** Treat all numbers as epoch value */
  if (typeof input === 'number') return input;

  /** Using Date.parse for the rest */
  return Date.parse(input);
};

/**
 * @param {number | string | Date} time
 * @param {string} period
 * @returns {Date} The lower bound Date of the $period that contains the input $time
 */
export function round(time: number | string | Date, period: string): Date {
  const timeEpoch = parseEpoch(time);
  const periodVal = getPeriod(period);

  return new Date(Math.floor(timeEpoch / periodVal) * periodVal);
};

const DateUtils = Object.freeze({ DURATION, format, getPeriod, parseEpoch, round });
export default DateUtils;
