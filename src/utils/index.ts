import DateUtils from './date';
import ScheduleUtils from './schedule';

export { DateUtils, ScheduleUtils };

const Utils = Object.freeze({
  Date    : DateUtils,
  Schedule: ScheduleUtils,
});
export default Utils;
