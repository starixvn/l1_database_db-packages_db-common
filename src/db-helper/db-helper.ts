import { Collection, Db, MongoClient, MongoClientOptions } from 'mongodb';
import ConnectionString from 'mongodb-connection-string-url';
import { CollectionInternal, DbInternal, MongoClientInternal } from '../interfaces/mongo';
import { URIEnvInput }                                         from '../interfaces/uri-env-input';
import { ConnectionStringRef, MongoClientRef }                 from './types';
import subscribeDBEvents from './db-event-monitoring';

export function buildURI({ SRV_PROTOCOL, SRV_USERNAME, SRV_PASSWORD, SRV_HOSTS, SRV_DB, SRV_REPLSET, SRV_AUTHDB, APP_NAME }: URIEnvInput, params?: URLSearchParams, fromURI?: ConnectionString): ConnectionString {
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

  /** Set custom application name */
  if (APP_NAME) uri.searchParams.set('appName', APP_NAME);

  return new ConnectionString(uri.href);
};

/**
 * @param reference
 * @param option
 * @returns The MongoClient instance that connected to the $reference
 */
export function createMongoConnection(reference: ConnectionStringRef, option?: MongoClientOptions): MongoClient {
  /** Get href from connection string */
  const url = getConnectionString(reference).href;

  /** Return *NEW* MongoClient object from the url */
  return subscribeDBEvents(new MongoClient(url, option));
};

/**
 * @param reference 
 * @returns The ConnectionString object that associated with $reference
 */
export function getConnectionString(reference: ConnectionStringRef): ConnectionString {
  /** Create connection string from string */
  if (typeof reference === 'string') return new ConnectionString(reference);

  /** Return reference because its already ConnectionString */
  return reference;
};

/**
 * @param reference
 * @returns The URI related to $reference
 */
export function getConnectionStringURI(reference: MongoClientRef): string {
  /** Get the URI from ConnectionString if reference is ConnectionStringRef */
  if (typeof reference === 'string' || reference instanceof ConnectionString) return getConnectionString(reference).href;

  /** Otherwise, get the URI from MongoClient internal field */
  return (getMongoClient(reference) as MongoClientInternal).s.url;
};

/**
 * @param reference 
 * @returns The MongoClient object that associated with $reference
 */
export function getMongoClient(reference: MongoClientRef): MongoClient {
  /** MongoClient can be created from connection string */
  if (typeof reference === 'string') return createMongoConnection(reference);

  /** MongoClient also can be created from ConnectionString object */
  if (reference instanceof ConnectionString) return createMongoConnection(reference);

  /** Return itself if $reference is already a MongoClient instance */
  if (reference instanceof MongoClient) return reference;

  /** Get MongoClient inside Db object */
  if (reference instanceof Db) return (reference as DbInternal).s.client;

  /** Get MongoClient inside Collection object */
  if (reference instanceof Collection) return getMongoClient((reference as CollectionInternal).s.db);

  throw TypeError('Cannot get MongoClient from $reference');
};

/**
 * @param reference 
 * @returns Removed password of the URI of $reference
 */
export function redactMongoConnectionString(reference: MongoClientRef): string {
  /** Get the URI from $reference */
  const uri = getConnectionStringURI(reference);

  /** String is treated as valid connection string */
  return uri.replace(/^mongodb:\/\/(.*):(.*)@/g, 'mongodb://$1:<REDACTED>@');
};

const DBHelper = Object.freeze({ buildURI, createMongoConnection, getConnectionString, getConnectionStringURI, getMongoClient, redactMongoConnectionString });
export default DBHelper;
