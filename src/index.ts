import { Collection, Db, MongoClient, MongoDBNamespace } from 'mongodb';
import ConnectionString from 'mongodb-connection-string-url';
import { CollectionInternal, DbInternal, MongoClientInternal } from './interfaces/mongo';
import DBHelper, { URIEnvInput } from './db-helper';
import Utils, { DateUtils, ScheduleUtils } from './utils';

/** Re-export mongodb classes */
export { ConnectionString, MongoDBNamespace, MongoClient, Db, Collection };

/** Export internal interfaces */
export { MongoClientInternal, DbInternal, CollectionInternal, URIEnvInput };

/** Export utils */
export { DateUtils, ScheduleUtils };

/** Export helpers */
export { DBHelper, Utils };

const DBCommon = {
  MongoDBNamespace, MongoClient, Db, Collection,
  DBHelper, Utils,
};
export default DBCommon;
