require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [
        `0x9e58e0265e9910670e7754eb66495433cf69420b09fb317de088a530c2eea7c4`,
      ],
    }
  }
};