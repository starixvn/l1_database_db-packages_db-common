/**
 * @param {number} period
 * @returns {number} The start epoch of the next period
 */
export function getNextEpoch(period: number): number {
  return (Math.floor(Date.now() / period) + 1) * period;
};

/**
 * @param {number} period
 * @returns {number} The number of milliseconds until the start of the next period
 */
export function getNextTimeout(period: number): number {
  return getNextEpoch(period) - Date.now();
}

const ScheduleUtils = Object.freeze({ getNextEpoch, getNextTimeout });
export default ScheduleUtils;
