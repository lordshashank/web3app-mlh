import { contractAddress, abi } from "../constants";
const ethers = require("ethers");
const { ethereum } = window as any;

const getProvider = () => {
  if (!ethereum) {
    throw new Error("Metamask is not installed! Go install the extension!");
  }

  return new ethers.providers.Web3Provider(ethereum);
};

const useVotingContractData = () => {
  const provider = getProvider();
  const signer = provider.getSigner(); // Create a new instance of the Contract
  const contract = new ethers.Contract(
    contractAddress.Voting,
    abi.Voting,
    signer
  );

  const getVotingFactor = async () => {
    let votingFactor = await contract.votingFactor();
    return Number(votingFactor);
  };

  const getTotalFunds = async () => {
    let totalFunds = await contract.totalFunds();
    return Number(totalFunds);
  };

  const getTotalVotesPerVoter = async () => {
    let totalVotesPerVoter = await contract.totalVotesPerVoter();
    return Number(totalVotesPerVoter);
  };

  const getProposalLimit = async () => {
    let proposalLimit = await contract.proposalLimit();
    return Number(proposalLimit);
  };

  const getOwner = async () => {
    let owner = await contract.owner();
    return owner;
  };

  const getVoter = async (address: string) => {
    let voter = await contract.voters(address);
    return voter;
  };

  const getProposal = async (index: number) => {
    try {
      let proposal = await contract.proposals(index);
      console.log(proposal);
      return proposal;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getVotingFactor,
    getTotalFunds,
    getTotalVotesPerVoter,
    getProposalLimit,
    getOwner,
    getVoter,
    getProposal,
  };
};

export default useVotingContractData;
