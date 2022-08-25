import { VERBOSE_LEVEL } from "./const";

/** Current verbose level */
let currentLevel = VERBOSE_LEVEL.INFO;

/** Turn off all log messages */
export function setOff() {
  currentLevel = VERBOSE_LEVEL.OFF;
};

export function setAll() {
  currentLevel = VERBOSE_LEVEL.ALL;
}

/** Log all messages with verbose level that equal or larger than TRACE */
export function setTrace() {
  currentLevel = VERBOSE_LEVEL.TRACE;
};

/** Log all messages with verbose level that equal or larger than DEBUG */
export function setDebug() {
  currentLevel = VERBOSE_LEVEL.DEBUG;
};

/** Log all messages with verbose level that equal or larger than INFO */
export function setInfo() {
  currentLevel = VERBOSE_LEVEL.INFO;
};

/** Log all messages with verbose level that equal or larger than WARN */
export function setWarn() {
  currentLevel = VERBOSE_LEVEL.WARN;
};

/** Log all messages with verbose level that equal or larger than ERROR */
export function setError() {
  currentLevel = VERBOSE_LEVEL.ERROR;
};

/** Log all messages with verbose level that equal or larger than FATAL */
export function setFatal() {
  currentLevel = VERBOSE_LEVEL.FATAL;
};

/** Get current verbose level */
export function status() {
  return currentLevel;
};

const Config = Object.freeze({ setOff, setAll, setTrace, setDebug, setInfo, setWarn, setError, setFatal, status });
export default Config;
