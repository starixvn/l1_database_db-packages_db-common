import { Collection, Db, MongoClient, MongoDBNamespace } from 'mongodb';
import ConnectionString from 'mongodb-connection-string-url';
import Logger           from '@ldb/logger';
import { ConnectionStringRef, MongoClientRef }                 from './db-helper/types';
import { CollectionInternal, DbInternal, MongoClientInternal } from './interfaces/mongo';
import { URIEnvInput }                                         from './interfaces/uri-env-input';
import DBHelper      from './db-helper/db-helper';
import DateUtils     from './utils/date';
import ScheduleUtils from './utils/schedule';

/** Re-export mongodb classes */
export { ConnectionString, MongoDBNamespace, MongoClient, Db, Collection };

/** Re-export logger */
export { Logger };

/** Export internal interfaces */
export { MongoClientInternal, DbInternal, CollectionInternal, URIEnvInput };

/** Export types */
export { ConnectionStringRef, MongoClientRef };

/** Export utils */
export { DateUtils, ScheduleUtils };

/** Export helpers */
export { DBHelper };

const DBCommon = {
  ConnectionString, MongoDBNamespace, MongoClient, Db, Collection,
  Logger,
  DBHelper, DateUtils, ScheduleUtils,
};
export default DBCommon;
