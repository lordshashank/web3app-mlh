require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  mocha: {
    timeout: 100000000,
  },
  networks: {
    hedara: {
      chainId: 296,
      url: "https://testnet.hashio.io/api",
      accounts: [PRIVATE_KEY],
    },
  },
};
