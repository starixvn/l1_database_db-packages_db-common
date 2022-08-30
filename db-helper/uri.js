import ConnectionString from "mongodb-connection-string-url";
import { isString } from "../utils/string";

/**
 *
 * @param {*} input
 * @returns {boolean}
 */
function isValidString(input) {
  return isString(input) && input.length;
};

/**
 *
 * @param {NodeJS.ProcessEnv} env
 * @param {string}            [env.SRV_PROTOCOL]
 * @param {string}            env.SRV_USERNAME
 * @param {string}            env.SRV_PASSWORD
 * @param {string}            env.SRV_HOSTS
 * @param {string}            env.SRV_DB
 * @param {string}            env.SRV_REPLSET
 * @param {string}            env.SRV_AUTHDB
 * @param {URLSearchParams}   [params]
 * @returns {ConnectionString}
 */
export function buildURI({ SRV_PROTOCOL, SRV_USERNAME, SRV_PASSWORD, SRV_HOSTS, SRV_DB, SRV_REPLSET, SRV_AUTHDB }, params) {
  if (params && !(params instanceof URLSearchParams)) throw TypeError(`$param must be an URLSearchParams instance`);

  /** Build using default uri */
  const uri = new ConnectionString('mongodb://localhost', { looseValidation: false });

  /** Using config as default */
  if (params) {
    Array.from(params.OPTIONS.entries()).forEach((option) => {
      uri.searchParams.set(...option);
    });
  }

  /** Set protocol */
  if (['mongodb', 'mongodb+srv'].includes(SRV_PROTOCOL)) uri.protocol = SRV_PROTOCOL;

  /** Set username */
  if (isValidString(SRV_USERNAME)) uri.username = SRV_USERNAME;

  /** Set password */
  if (isValidString(SRV_PASSWORD)) uri.password = SRV_PASSWORD;

  /** Set hosts */
  if (isValidString(SRV_HOSTS)) {
    /** Parse hosts to list of hosts */
    const hosts = SRV_HOSTS.split(',');
    uri.hosts = hosts;
  }

  /** Set default DB */
  if (isValidString(SRV_DB)) uri.pathname = SRV_DB;

  /** Set replica set option */
  if (isValidString(SRV_REPLSET)) uri.searchParams.set('replicaSet', SRV_REPLSET);

  /** Set authenticate database option */
  if (isValidString(SRV_AUTHDB)) uri.searchParams.set('authSource', SRV_AUTHDB);

  return new ConnectionString(uri.href);
};

export default buildURI;
