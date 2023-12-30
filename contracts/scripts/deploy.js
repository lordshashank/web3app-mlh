// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const lockedAmount = hre.ethers.parseEther("1");

  const lock = await hre.ethers.deployContract("Voting", [2, 100, 10], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Voting with ${ethers.formatEther(lockedAmount)}ETH and deployed to ${
      lock.target
    }`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
