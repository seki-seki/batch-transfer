module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 9545,
            network_id: "*", // Match any network id
            gas: 3000000,   // <--- Twice as much
        }
    }
};
