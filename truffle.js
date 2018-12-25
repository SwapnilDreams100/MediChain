/*
module.exports = {
 networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
     network_id: "*" // Match any network id
    }
  }
};
*/

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      "gas": "2000000"
    }
  },
};
