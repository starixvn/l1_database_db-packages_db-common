import { VERBOSE_LEVEL } from "./const";

/** Current verbose level */
let currentLevel = VERBOSE_LEVEL.INFO;

/** Turn off all log messages */
function setOff () {
  currentLevel = VERBOSE_LEVEL.OFF;
};

function setAll () {
  currentLevel = VERBOSE_LEVEL.ALL;
}

/** Log all messages with verbose level that equal or larger than TRACE */
function setTrace () {
  currentLevel = VERBOSE_LEVEL.TRACE;
};

/** Log all messages with verbose level that equal or larger than DEBUG */
function setDebug () {
  currentLevel = VERBOSE_LEVEL.DEBUG;
};

/** Log all messages with verbose level that equal or larger than INFO */
function setInfo () {
  currentLevel = VERBOSE_LEVEL.INFO;
};

/** Log all messages with verbose level that equal or larger than WARN */
function setWarn () {
  currentLevel = VERBOSE_LEVEL.WARN;
};

/** Log all messages with verbose level that equal or larger than ERROR */
function setError () {
  currentLevel = VERBOSE_LEVEL.ERROR;
};

/** Log all messages with verbose level that equal or larger than FATAL */
function setFatal () {
  currentLevel = VERBOSE_LEVEL.FATAL;
};

/** Get current verbose level */
function status () {
  return currentLevel;
};

export const Config = Object.freeze({ setOff, setAll, setTrace, setDebug, setInfo, setWarn, setError, setFatal, status });
export default Config;
