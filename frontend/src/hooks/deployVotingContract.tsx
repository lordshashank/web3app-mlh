import { bytecode, abi } from "../constants";
const ethers = require("ethers");
const { ethereum } = window as any;

const getProvider = () => {
  if (!ethereum) {
    throw new Error("Metamask is not installed! Go install the extension!");
  }

  return new ethers.providers.Web3Provider(ethereum);
};

const deployVotingContract = () => {
  async function deployContract(
    _votingFactor: number,
    _totalVotesPerVoter: number,
    _proposalLimit: number,
    _totalFunds: number
  ) {
    const provider = getProvider();
    const signer = provider.getSigner(); // Create a new instance of the Contract

    // Create a factory for the Contract
    let factory = new ethers.ContractFactory(
      abi.Voting,
      bytecode.Voting,
      signer
    );

    // Notice we pass in the constructor parameters to the deploy method
    let contract = await factory.deploy(
      _votingFactor,
      _totalVotesPerVoter,
      _proposalLimit,
      { value: ethers.utils.parseEther(_totalFunds.toString()) }
    );

    // The contract is NOT deployed yet; we must wait until it is mined
    const deployedContract = await contract.deployed();

    console.log(contract.address);

    return contract;
  }

  return deployContract;
};

export default deployVotingContract;
