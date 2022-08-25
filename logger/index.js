/* eslint no-console: "off" */

import { Paint } from "@ldb/terminal-paint";
import Config from "./config";
import { VERBOSE_LEVEL } from "./const";
import { tabNL, isString } from "../utils/string";

/**
 * @param {string} message
 * @param {string} label
 * @param {string} subject
 * @param {Date}   time
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
export async function trace(message, label, subject, time) {
  try {
    if (VERBOSE_LEVEL.TRACE < Config.status()) return -1;

    const ltime = time instanceof Date ? time.toISOString() : new Date().toISOString();
    const level = 'T';
    const title = label ? `[${label}]` : '';
    const msg = message ? Paint.faint(message) : '';
    const content = [[title, subject].filter(Boolean).join(' - '), msg].filter(Boolean).join('\n');

    console.log(Paint.fgBlue(`${ltime} ${level}  ${tabNL(content)}`));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * @param {string} message
 * @param {string} label
 * @param {string} subject
 * @param {Date}   time
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
export async function debug(message, label, subject, time) {
  try {
    if (VERBOSE_LEVEL.DEBUG < Config.status()) return -1;

    const ltime = time instanceof Date ? time.toISOString() : new Date().toISOString();
    const level = 'D';
    const title = label ? `[${label}]` : '';
    const msg = message ? Paint.faint(message) : '';
    const content = [[title, subject].filter(Boolean).join(' - '), msg].filter(Boolean).join('\n');

    console.log(Paint.fgGreen(`${ltime} ${level}  ${tabNL(content)}`));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * @param {string} message
 * @param {string} label
 * @param {string} subject
 * @param {Date}   time
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
export async function info(message, label, subject, time) {
  try {
    if (VERBOSE_LEVEL.INFO < Config.status()) return -1;

    const ltime = time instanceof Date ? time.toISOString() : new Date().toISOString();
    const level = 'I';
    const title = label ? `[${label}]` : '';
    const content = [[title, subject].filter(Boolean).join(' - '), message].filter(Boolean).join('\n');

    console.log(Paint.fgWhite(`${ltime} ${level}  ${tabNL(content)}`));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * @param {string} message
 * @param {string} label
 * @param {string} subject
 * @param {Date}   time
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
export async function warn(message, label, subject, time) {
  try {
    if (VERBOSE_LEVEL.WARN < Config.status()) return -1;

    const ltime = time instanceof Date ? time.toISOString() : new Date().toISOString();
    const level = Paint.bold('W');
    const title = label ? Paint.bold(`[${label}]`) : '';
    const content = [[title, subject].filter(Boolean).join(' - '), message].filter(Boolean).join('\n');

    console.log(Paint.fgYellow(`${ltime} ${level}  ${tabNL(content)}`));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * @param {string} message
 * @param {string} label
 * @param {string} subject
 * @param {Date}   time
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
export async function err(message, label, subject, time) {
  try {
    if (VERBOSE_LEVEL.ERROR < Config.status()) return -1;

    const ltime = time instanceof Date ? time.toISOString() : new Date().toISOString();
    const level = 'E';
    const title = label ? `[${label}]` : '';
    const content = [[title, subject].filter(Boolean).join(' - '), message].filter(Boolean).join('\n');

    console.log(Paint.bold(Paint.fgRed(`${ltime} ${level}  ${tabNL(content)}`)));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * @param {string} message
 * @param {string} label
 * @param {string} subject
 * @param {Date}   time
 * @returns {Promise<number>}
 *   - `0` Success
 *   - non-zero Failure
 */
export async function fatal(message, label, subject, time) {
  try {
    if (VERBOSE_LEVEL.FATAL < Config.status()) return -1;

    const ltime = time instanceof Date ? time.toISOString() : new Date().toISOString();
    const level = 'F';
    const title = label ? Paint.underline(`[${label}]`) : '';
    const content = [[title, subject].filter(Boolean).join(' - '), message].filter(Boolean).join('\n');

    console.log(Paint.bold(Paint.fgMagenta(`${Paint.underline(ltime)} ${Paint.underline(level)}  ${tabNL(content)}`)));
  } catch (e) {
    return e.code ?? 1;
  }
  return 0;
};

/**
 * @param {Error}  error
 * @param {string} label
 * @param {Date}   time
 * @returns {Promise<number>}
 */
export async function catchWarning(error, label, time) {
  if (isString(error)) return warn(error, label, undefined, time);

  const msg = [error.message, error.stack ? `Stack: ${error.stack}` : ''].filter(Boolean).join('\n');
  return warn(msg, label, error.name, time);
};

/**
 * @param {Error}  error
 * @param {string} label
 * @param {Date}   time
 * @returns {Promise<number>}
 */
export async function catchError(error, label, time) {
  if (isString(error)) return err(error, label, undefined, time);

  const msg = [error.message, error.stack ? `Stack: ${error.stack}` : ''].filter(Boolean).join('\n');
  return err(msg, label, error.name, time);
};

/**
 * @param {Error}  error
 * @param {string} label
 * @param {Date}   time
 * @returns {Promise<number>}
 */
export async function catchFatal(error, label, time) {
  if (isString(error)) return fatal(error, label, undefined, time);

  const msg = [error.message, error.stack ? `Stack: ${error.stack}` : ''].filter(Boolean).join('\n');
  return fatal(msg, label, error.name, time);
};

const Logger = Object.freeze({
  Config, VERBOSE_LEVEL,
  trace, debug, info, warn, err, fatal,
  catchWarning, catchError, catchFatal,
});
export default Logger;

export { Config, VERBOSE_LEVEL };
