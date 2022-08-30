import { MongoClient, Db, Collection } from "mongodb";
import ConnectionString from "mongodb-connection-string-url";
import { isString } from "../utils/string";
import buildURI from "./uri";
import subscribeDBEvents from "./db-event-monitoring";

/**
 * @param {string} url
 * @returns {MongoClient} The MongoClient instance that connected to the $url
 */
export function createMongoConnection(url) {
  if (!isString(url)) throw TypeError(`$url must be a string`);

  const mongo = new MongoClient(url);
  subscribeDBEvents(mongo);
  return mongo;
};

/**
 * @param {string|ConnectionString|MongoClient|Db|Collection} reference
 * @returns {MongoClient} The MongoClient object that associated with $reference
 */
export function getMongoClient(reference) {
  /** MongoClient can be created from connection string */
  if (isString(reference)) return createMongoConnection(reference);

  /** MongoClient also can be created from ConnectionString object */
  if (reference instanceof ConnectionString) return createMongoConnection(reference.href);

  /** Return itself if $reference is already a MongoClient instance */
  if (reference instanceof MongoClient) return reference;

  /** Get MongoClient inside Db object */
  if (reference instanceof Db) return reference.s.client;

  /** Get MongoClient inside Collection object */
  if (reference instanceof Collection) return getMongoClient(reference.s.db);

  throw TypeError(`Cannot get MongoClient from $reference`);
};

/**
 * @param {string} connStr
 * @returns {string} Removed password of $connStr
 */
export function redactMongoConnectionString(connStr) {
  if (!isString(connStr)) throw TypeError(`$connStr must be a string`);

  return connStr.replace(/^mongodb:\/\/(.*):(.*)@/g, 'mongodb://$1:<REDACTED>@');
};

const DBHelper = Object.freeze({ buildURI, createMongoConnection, getMongoClient, redactMongoConnectionString });
export default DBHelper;
