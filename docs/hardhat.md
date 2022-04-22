# HardHat Configuration

## Initialization 
```
    npx hardhat
```
* Note: If you already have `README.md` and `.gitignore` files in your project directory, the command complains about it. To figure out you can rename already existing files with `.orig` extension and execute harhat command. After manually merge `README.md` and `.gitignore` files.

## Configuration (hardhat.config.js)
```
require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
  },
  defaultNetwork: "hardhat", // default network 
  networks: {
    hardhat: { // hardhat network configuration
      chainId: 1337
    },
  }
};
```