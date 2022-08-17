import { MongoClient } from "mongodb";
import { isString } from "../utils/string";
import subscribeDBEvents from "./db-event-monitoring";

/**
 * 
 * @param {string} url 
 * @returns {MongoClient}
 */
export function createMongoConnection (url) {
  const mongo = new MongoClient(url);
  subscribeDBEvents(mongo);
  return mongo;
};

/**
 * 
 * @param {string} connStr 
 * @returns {string}
 */
export function redactMongoConnectionString (connStr) {
  if (!isString(connStr)) return connStr;
  return connStr.replace(/^mongodb:\/\/(.*):(.*)@/g, 'mongodb://$1:<REDACTED>@')
};

const DBHelper = Object.freeze({ createMongoConnection, redactMongoConnectionString });
export default DBHelper;
