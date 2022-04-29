
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import * as dotenv from 'dotenv'

dotenv.config({ path: './.env.local' });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
  solidity: {
    version: "0.8.4",
  },
  defaultNetwork: "ganache",
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
