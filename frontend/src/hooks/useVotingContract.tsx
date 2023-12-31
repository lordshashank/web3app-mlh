import { contractAddress, abi } from "../constants";
const ethers = require("ethers");
const { ethereum } = window as any;

const getProvider = () => {
  if (!ethereum) {
    throw new Error("Metamask is not installed! Go install the extension!");
  }

  return new ethers.providers.Web3Provider(ethereum);
};

const useVoteContract = () => {
  const provider = getProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress.Voting,
    abi.Voting,
    signer
  );
  const addProposal = async (proposal: string) => {
    try {
      const tx = await contract.addProposal(proposal, { gasLimit: 1000000 });
      await tx.wait();
      return "proposal added";
    } catch (error) {
      console.error("Error adding proposal: ", error);
    }
  };

  const vote = async (proposal: string, votes: number) => {
    try {
      const tx = await contract.vote(proposal, votes, { gasLimit: 1000000 });
      await tx.wait();
      return "voted";
    } catch (error) {
      console.error("Error voting: ", error);
    }
  };

  const distributeFunds = async () => {
    try {
      const tx = await contract.distributeFunds({ gasLimit: 1000000 });
      await tx.wait();
      return "funds distributed";
    } catch (error) {
      console.error("Error distributing funds: ", error);
    }
  };

  return { addProposal, vote, distributeFunds };
};

export default useVoteContract;
