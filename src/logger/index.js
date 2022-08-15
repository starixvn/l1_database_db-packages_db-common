import { Paint } from "@ldb/terminal-paint";
import { VERBOSE_LEVEL } from "./const";
import { Config } from "./config";
import { tabNL, isString } from "../utils/string";

/**
 * @param {string} message 
 * @param {string} label 
 * @param {string} subject 
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
export async function trace (message, label, subject) {
  try {
    if (VERBOSE_LEVEL.TRACE < Config.status()) return -1;

    const time = new Date().toISOString();
    const level = 'T';
    let title = label ? `[${label}]` : '';
    title += subject ? (label ? ' - ' : '') + subject : '';

    const msg = tabNL(title ? `\
${title}
${Paint.faint(message)}` : Paint.faint(message));

    console.log(Paint.fgBlue(`${time} ${level}  ${msg}`));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * @param {string} message 
 * @param {string} label 
 * @param {string} subject 
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
 export async function debug (message, label, subject) {
  try {
    if (VERBOSE_LEVEL.DEBUG < Config.status()) return -1;

    const time = new Date().toISOString();
    const level = 'D';
    let title = label ? `[${label}]` : '';
    title += subject ? (label ? ' - ' : '') + subject : '';

    const msg = tabNL(title ? `\
${title}
${Paint.faint(message)}` : Paint.faint(message));

    console.log(Paint.fgGreen(`${time} ${level}  ${msg}`));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * @param {string} message 
 * @param {string} label 
 * @param {string} subject 
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
 export async function info (message, label, subject) {
  try {
    if (VERBOSE_LEVEL.INFO < Config.status()) return;

    const time = new Date().toISOString();
    const level = 'I';
    let title = label ? `[${label}]` : '';
    title += subject ? (label ? ' - ' : '') + subject : '';

    const msg = tabNL(title ? `\
${title}
${message}` : message);

    console.log(Paint.fgWhite(`${time} ${level}  ${msg}`));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * @param {string} message 
 * @param {string} label 
 * @param {string} subject 
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
 export async function warn (message, label, subject) {
  try {
    if (VERBOSE_LEVEL.WARN < Config.status()) return;

    const time = new Date().toISOString();
    const level = Paint.bold('W');
    let title = label ? `[${label}]` : '';
    title += subject ? (label ? ' - ' : '') + subject : '';

    const msg = tabNL(title ? `\
${Paint.bold(title)}
${message}` : message);

    console.log(Paint.fgYellow(`${time} ${level}  ${msg}`));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * @param {string} message 
 * @param {string} label 
 * @param {string} subject 
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
 export async function err (message, label, subject) {
  try {
    if (VERBOSE_LEVEL.ERROR < Config.status()) return;

    const time = new Date().toISOString();
    const level = Paint.bold('E');
    let title = label ? `[${label}]` : '';
    title += subject ? (label ? ' - ' : '') + subject : '';

    const msg = tabNL(title ? `\
${title}
${message}` : message);

    console.log(Paint.bold(Paint.fgRed(`${time} ${level}  ${msg}`)));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * @param {string} message 
 * @param {string} label 
 * @param {string} subject 
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
 export async function fatal (message, label, subject) {
  try {
    if (VERBOSE_LEVEL.FATAL < Config.status()) return;

    const time = new Date().toISOString();
    const level = 'F';
    let title = label ? `[${label}]` : '';
    title += subject ? (label ? ' - ' : '') + subject : '';

    const msg = tabNL(title ? `\
${Paint.underline(title)}
${message}` : message);

    console.log(Paint.bold(Paint.fgMagenta(`${Paint.underline(time)} ${Paint.underline(level)}  ${msg}`)));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * 
 * @param {Error} error 
 * @param {string} label 
 * @returns {Promise<number>}
 */
export async function catchWarning (error, label) {
  if (isString(error)) return warn(error, label);

  let msg = error.message ? error.message + '\n' : '';
  msg += error.stack ? `Stack: ${error.stack}\n` : '';
  return warn(msg, label, error.name);
};

/**
 * 
 * @param {Error} error 
 * @param {string} label 
 * @returns {Promise<number>}
 */
export async function catchError (error, label) {
  if (isString(error)) return err(error, label);

  let msg = error.message ? error.message + '\n' : '';
  msg += error.stack ? `Stack: ${error.stack}\n` : '';
  return err(msg, label, error.name);
};

/**
 * 
 * @param {Error} error 
 * @param {string} label 
 * @returns {Promise<number>}
 */
export async function catchFatal (error, label) {
  if (isString(error)) return fatal(error, label);

  let msg = error.message ? error.message + '\n' : '';
  msg += error.stack ? `Stack: ${error.stack}\n` : '';
  return fatal(msg, label, error.name);
};

const Logger = Object.freeze({
  Config, VERBOSE_LEVEL,
  trace, debug, info, warn, err, fatal,
  catchWarning, catchError, catchFatal,
});
export default Logger;

export { Config, VERBOSE_LEVEL };
