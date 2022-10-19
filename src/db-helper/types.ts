import { Collection, Db, MongoClient } from 'mongodb';
import ConnectionString from 'mongodb-connection-string-url';

export type ConnectionStringRef = string | ConnectionString;

export type MongoClientRef = ConnectionStringRef | MongoClient | Db | Collection;
