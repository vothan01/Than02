require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();

const fs = require('fs');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.2",
    networks: {
        // polygonMainnet: {
        //     url: process.env.POLYGONMAINNET_RPC,
        //     accounts: [process.env.PRIVATE_KEY],
        // },
        polygonTestnet: {
            url: process.env.POLYGON_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
            gasPrice: 8000000000,
        },
        bscTestnet: {
            url: process.env.BSC_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
            // gasPrice: 8000000000,
        }
    },
    //bsc
    // etherscan: {
    //     apiKey: process.env.BSCSCAN_API
    // },
    //polygon
    etherscan: {
      apiKey: process.env.POLYGON_API
    },
};