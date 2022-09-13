import { Collection, Db, MongoClient } from 'mongodb';

export interface MongoClientInternal extends MongoClient {
  s: { url: string };
};

export interface DbInternal extends Db {
  s: { client: MongoClient };
};

export interface CollectionInternal extends Collection {
  s: { db: Db };
};
