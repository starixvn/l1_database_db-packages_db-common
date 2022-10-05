import { Collection, Db, MongoClient } from 'mongodb';
import ConnectionString  from 'mongodb-connection-string-url';
import { buildURI, URIEnvInput }                               from './build-uri';
import { CollectionInternal, DbInternal, MongoClientInternal } from '../interfaces/mongo';
import subscribeDBEvents from './db-event-monitoring';

/**
 * @param {string} url
 * @returns {MongoClient} The MongoClient instance that connected to the $url
 */
export function createMongoConnection(url: string): MongoClient {
  const mongo = new MongoClient(url);
  subscribeDBEvents(mongo);
  return mongo;
};

/**
 * @param {string|ConnectionString|MongoClient|Db|Collection} reference
 * @returns {MongoClient} The MongoClient object that associated with $reference
 */
export function getMongoClient(reference: string | ConnectionString | MongoClient | Db | Collection): MongoClient {
  /** MongoClient can be created from connection string */
  if (typeof reference === 'string') return createMongoConnection(reference);

  /** MongoClient also can be created from ConnectionString object */
  if (reference instanceof ConnectionString) return createMongoConnection(reference.href);

  /** Return itself if $reference is already a MongoClient instance */
  if (reference instanceof MongoClient) return reference;

  /** Get MongoClient inside Db object */
  if (reference instanceof Db) return (reference as DbInternal).s.client;

  /** Get MongoClient inside Collection object */
  if (reference instanceof Collection) return getMongoClient((reference as CollectionInternal).s.db);

  throw TypeError('Cannot get MongoClient from $reference');
};

/**
 * @param {string | ConnectionString | MongoClient | Db | Collection} connStr
 * @returns {string} Removed password of $connStr
 */
export function redactMongoConnectionString(connStr: string | ConnectionString | MongoClient | Db | Collection): string {
  /** All mongodb object are converted to MongoClient and then extract connection string from internal field */
  if (connStr instanceof MongoClient || connStr instanceof Db || connStr instanceof Collection) return redactMongoConnectionString((getMongoClient(connStr) as MongoClientInternal).s.url);

  /** Get string from ConnectionString object */
  if (connStr instanceof ConnectionString) return redactMongoConnectionString(connStr.href);

  /** String is treated as valid connection string */
  return connStr.replace(/^mongodb:\/\/(.*):(.*)@/g, 'mongodb://$1:<REDACTED>@');
};

export { URIEnvInput };
export { buildURI };

const DBHelper = { buildURI, createMongoConnection, getMongoClient, redactMongoConnectionString };
export default DBHelper;
