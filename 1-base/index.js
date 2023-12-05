const dotenv = require('dotenv');
const { Web3, providers, HttpProvider } = require('web3');

dotenv.config();
const INFURA_HTTP_URL = process.env.INFURA_HTTP_URL;
const INFURA_WS_URL = process.env.INFURA_WS_URL;

// PROVIDERS
const httpProvider = new HttpProvider(INFURA_HTTP_URL, {
  keepAlive: true,
  withCredentials: false,
  timeout: 20000, // ms
})

const wsProvider = new providers.ws.default(INFURA_WS_URL, {
  timeout: 30000, // ms
  clientConfig: {
    // Useful if requests are large
    maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
    maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

    // Useful to keep a connection alive
    keepalive: true,
    keepaliveInterval: 60000 // ms
  },
  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 5,
    onTimeout: false
  }
})

// INSTANCES
const httpWEB3 = new Web3(httpProvider);
const wsWEB3 = new Web3(wsProvider);

// HTTP
(async () => {
  console.log('HTTP getBlockNumber => ', httpWEB3.currentProvider);
  console.log('HTTP getBlockNumber => ', await httpWEB3.eth.getBlockNumber());
  console.log('HTTP getBlockNumber => ', await httpWEB3.eth.getBlock('latest'));
})();

// WS
(async () => {
  return;

  console.log('WS getBlockNumber => ', wsWEB3.currentProvider)
  console.log('WS getBlockNumber => ', await wsWEB3.eth.getBlockNumber())
})();