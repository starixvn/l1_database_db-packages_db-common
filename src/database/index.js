import { MongoClient } from "mongodb";

const MONGO_CLIENT_EVENTS = [
  "connectionPoolCreated",
  "connectionPoolClosed",
  "connectionClosed",
  "connectionCheckOutFailed",
  "connectionPoolCleared",
  "commandFailed",
  "serverOpening",
  "serverClosed",
  "serverDescriptionChanged",
  "topologyOpening",
  "topologyClosed",
  "topologyDescriptionChanged",
  "error",
  "timeout",
  "close",
];

/**
 * 
 * @param {string} url 
 * @returns {MongoClient}
 */
function createMongoConnection (url) {
  const mongo = new MongoClient(url);
  MONGO_CLIENT_EVENTS.forEach(event => {
    mongo.on(event, function () {
      console.log(`Captured [${event}] - `, ...arguments);
    });
  });
  return mongo;
};

export {
  createMongoConnection,
};
