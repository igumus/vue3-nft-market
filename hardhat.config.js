require("@nomiclabs/hardhat-waffle");
const dotenv = require('dotenv-flow')

dotenv.config()

console.log('rpc addr', process.env.VUE_APP_NETWORK_RPC_ADDR)


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
  },
  networks: {
    ganache: {
      url: `${process.env.VUE_APP_NETWORK_RPC_ADDR}`,
      chainId: 1337,
      accounts: [
        `0x${process.env.GANACHE_LOCAL_ACCOUNT}`,
      ],
    }
  }
};