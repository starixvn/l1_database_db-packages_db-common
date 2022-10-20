import Logger from '@ldb/logger';
import { CommandFailedEvent, ConnectionCheckOutFailedEvent, ConnectionClosedEvent, ConnectionPoolClearedEvent, ConnectionPoolClosedEvent, ConnectionPoolCreatedEvent, MongoClient } from 'mongodb';

/**
 * ConnectionPoolCreatedEvent is emitted when a connection pool is created
 * ConnectionPoolClosedEvent  is emitted when a connection pool is closed, prior to server instance destruction
 * ConnectionPoolClearedEvent is emitted when the connection pool’s generation count is increased
 * Verbosity: INFO
 * @param event
 */
export function whenConnectionPoolEvents(event: ConnectionPoolCreatedEvent | ConnectionPoolClosedEvent | ConnectionPoolClearedEvent) {
  const { time } = event;
  const label = event.constructor.name;
  const subject = event.address;

  Logger.debug(undefined, label, subject, time);
};

/**
 * ConnectionClosedEvent is emitted when a connection is closed
 * Verbosity: WARN
 * @param event
 */
export function whenConnectionClosed(event: ConnectionClosedEvent) {
  const { time } = event;
  const label = event.constructor.name;
  const subject = [event.address, `#${event.connectionId}`].filter(Boolean).join(' - ');
  const message = event.reason;

  Logger.warn(message, label, subject, time);
};

/**
 * ConnectionCheckOutFailedEvent is emitted when an operation fails to acquire a connection for execution
 * Verbosity: ERROR
 * @param event
 */
export function whenConnectionCheckOutFailed(event: ConnectionCheckOutFailedEvent) {
  const { time } = event;
  const label = event.constructor.name;
  const subject = event.address;
  const message = (typeof event.reason === 'string') ? event.reason : [event.reason.message, event.reason.stack ? `Stack: ${event.reason.stack}` : ''].filter(Boolean).join('\n');

  Logger.err(message, label, subject, time);
};

/**
 * CommandFailedEvent is emitted when a command failed
 * Verbosity: ERROR
 * @param event
 */
export function whenCommandFailed(event: CommandFailedEvent) {
  const label = event.constructor.name;
  const subject = [event.address, `#${event.connectionId}`].filter(Boolean).join(' - ');
  const info = [`Req#${event.requestId}`, event.commandName, `${event.duration}ms`].join(' - ');
  const message = [info, event.failure.message, event.failure.stack ? `Stack: ${event.failure.stack}` : ''].filter(Boolean).join('\n');

  Logger.err(message, label, subject);
};

/**
 * Error
 * Verbosity: ERROR
 * @param {Error} event
 */
export function whenError(event: Error) {
  Logger.catchError(event, 'MongoClientError');
};

/**
 * @param client
 * @returns The same client
 */
export function subscribeDBEvents(client: MongoClient): MongoClient {
  client.on('connectionPoolCreated', whenConnectionPoolEvents);
  client.on('connectionPoolClosed', whenConnectionPoolEvents);
  client.on('connectionPoolCleared', whenConnectionPoolEvents);
  client.on('connectionClosed', whenConnectionClosed);
  client.on('connectionCheckOutFailed', whenConnectionCheckOutFailed);
  client.on('commandFailed', whenCommandFailed);
  client.on('error', whenError);

  return client;
};
export default subscribeDBEvents;
