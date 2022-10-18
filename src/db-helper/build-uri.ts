import ConnectionString from 'mongodb-connection-string-url';

export interface URIEnvInput extends NodeJS.ProcessEnv {
  SRV_PROTOCOL ?: string;
  SRV_USERNAME  : string;
  SRV_PASSWORD  : string;
  SRV_HOSTS     : string;
  SRV_DB        : string;
  SRV_REPLSET   : string;
  SRV_AUTHDB    : string;
};

/**
 * @param {URIEnvInput}       env
 * @param {URLSearchParams}   [params]
 * @param {ConnectionString}  [fromURI]
 * @returns {ConnectionString}
 */
export function buildURI({ SRV_PROTOCOL, SRV_USERNAME, SRV_PASSWORD, SRV_HOSTS, SRV_DB, SRV_REPLSET, SRV_AUTHDB }: URIEnvInput, params?: URLSearchParams, fromURI?: ConnectionString): ConnectionString {
  /** Build using default uri */
  const uri = new ConnectionString(fromURI?.href ?? 'mongodb://localhost', { looseValidation: false });

  /** Using config as default */
  if (params) {
    Array.from(params.entries()).forEach((option) => {
      uri.searchParams.set(...option);
    });
  }

  /** Set protocol */
  if (SRV_PROTOCOL && ['mongodb', 'mongodb+srv'].includes(SRV_PROTOCOL)) uri.protocol = SRV_PROTOCOL;

  /** Set username */
  if (SRV_USERNAME) uri.username = SRV_USERNAME;

  /** Set password */
  if (SRV_PASSWORD) uri.password = SRV_PASSWORD;

  /** Set hosts */
  if (SRV_HOSTS) {
    /** Parse hosts to list of hosts */
    const hosts = SRV_HOSTS.split(',');
    uri.hosts = hosts;
  }

  /** Set default DB */
  if (SRV_DB) uri.pathname = SRV_DB;

  /** Set replica set option */
  if (SRV_REPLSET) uri.searchParams.set('replicaSet', SRV_REPLSET);

  /** Set authenticate database option */
  if (SRV_AUTHDB) uri.searchParams.set('authSource', SRV_AUTHDB);

  return new ConnectionString(uri.href);
};

export default buildURI;
