import DateUtils from "./date";
import ScheduleUtils from "./schedule";
import StringUtils from "./string";

export { DateUtils, ScheduleUtils, StringUtils };

const Utils = Object.freeze({
  Date: DateUtils,
  Schedule: ScheduleUtils,
  String: StringUtils,
});
export default Utils;
