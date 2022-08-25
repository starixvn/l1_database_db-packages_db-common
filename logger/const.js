export const VERBOSE_LEVEL = Object.freeze({
  OFF   : Infinity,
  ALL   : -Infinity,
  TRACE : 1,
  DEBUG : 2,
  INFO  : 3,
  WARN  : 4,
  ERROR : 5,
  FATAL : 6,
});

const CONST = Object.freeze({ VERBOSE_LEVEL });
export default CONST;
