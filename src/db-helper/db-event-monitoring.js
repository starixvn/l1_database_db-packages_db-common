import { CommandFailedEvent, ConnectionCheckOutFailedEvent, ConnectionClosedEvent, ConnectionPoolMonitoringEvent, MongoClient, TopologyClosedEvent } from "mongodb";
import { isString } from "../utils/string";
import Logger from "../logger";

/** 
 * ConnectionPoolCreatedEvent is emitted when a connection pool is created, 
 * ConnectionPoolClosedEvent  is emitted when a connection pool is closed, prior to server instance destruction
 * ConnectionPoolClearedEvent is emitted when the connection pool’s generation count is increased
 * Verbosity: INFO
 * @param {ConnectionPoolMonitoringEvent} event
 */
export function whenConnectionPoolEvents (event) {
  const time = event.time;
  const label = event.constructor.name;
  const subject = [event.address, event?.options?.credentials?.username].filter(Boolean).join(' - ');

  Logger.info(undefined, label, subject, time);
};

/** 
 * ConnectionClosedEvent is emitted when a connection is closed
 * Verbosity: WARN
 * @param {ConnectionClosedEvent} event
 */
 export function whenConnectionClosed (event) {
  const time = event.time;
  const label = event.constructor.name;
  const subject = [event.address, `#${event.connectionId}`].filter(Boolean).join(' - ');
  const message = event.reason;

  Logger.warn(message, label, subject, time);
};

/** 
 * ConnectionCheckOutFailedEvent is emitted when an operation fails to acquire a connection for execution
 * Verbosity: ERROR
 * @param {ConnectionCheckOutFailedEvent} event
 */
 export function whenConnectionCheckOutFailed (event) {
  const time = event.time;
  const label = event.constructor.name;
  const subject = [event.address, `#${event.connectionId}`].filter(Boolean).join(' - ');
  const message = isString(event.reason)
                ? event.reason
                : [event.reason.message, event.reason.stack ? `Stack: ${event.reason.stack}` : ''].filter(Boolean).join('\n')
                ;

  Logger.err(message, label, subject, time);
};

/** 
 * CommandFailedEvent is emitted when a command failed
 * Verbosity: ERROR
 * @param {CommandFailedEvent} event
 */
 export function whenCommandFailed (event) {
  const label = event.constructor.name;
  const subject = [event.address, `#${event.connectionId}`].filter(Boolean).join(' - ');
  const info = [`Req#${event.requestId}`, event.commandName, `${event.duration}ms`].join(' - ');
  const message = [info, event.failure.message, event.failure.stack ? `Stack: ${event.failure.stack}` : ''].filter(Boolean).join('\n');

  Logger.err(message, label, subject, time);
};

/**
 * Error
 * Verbosity: ERROR
 * @param {Error} event
 */
export function whenError (event) {
  Logger.catchError(event, 'MongoClientError');
};

/**
 * 
 * @param {MongoClient} client 
 */
export function subscribeDBEvents (client) {
  client.on("connectionPoolCreated"   , whenConnectionPoolEvents);
  client.on("connectionPoolClosed"    , whenConnectionPoolEvents);
  client.on("connectionPoolCleared"   , whenConnectionPoolEvents);
  client.on("connectionClosed"        , whenConnectionClosed);
  client.on("connectionCheckOutFailed", whenConnectionCheckOutFailed);
  client.on("commandFailed"           , whenCommandFailed);
  client.on("error"                   , whenError);
};
export default subscribeDBEvents;
