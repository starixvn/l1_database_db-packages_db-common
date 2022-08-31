import DateUtils     from "./date";
import NumberUtils   from "./number";
import ScheduleUtils from "./schedule";
import StringUtils   from "./string";

export { DateUtils, NumberUtils, ScheduleUtils, StringUtils };

const Utils = Object.freeze({
  Date    : DateUtils,
  Number  : NumberUtils,
  Schedule: ScheduleUtils,
  String  : StringUtils,
});
export default Utils;
