import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { contractAddress, abi } from "../constants";
import { ContractId } from "@hashgraph/sdk";
const useVoteContract = () => {
  const { walletInterface } = useWalletInterface();
  const addProposal = async (proposal: string) => {
    await walletInterface?.executeContractFunction(
      ContractId.fromSolidityAddress(contractAddress.Voting),
      "addProposal",
      new ContractFunctionParameterBuilder().addParam({
        type: "string",
        name: "proposal",
        value: proposal,
      }),
      Number("1000000")
    );
    return "proposal added";
  };

  const vote = async (proposal: string, votes: number) => {
    await walletInterface?.executeContractFunction(
      ContractId.fromSolidityAddress(contractAddress.Voting),
      "vote",
      new ContractFunctionParameterBuilder()
        .addParam({
          type: "string",
          name: "proposal",
          value: proposal,
        })
        .addParam({
          type: "uint",
          name: "votes",
          value: votes,
        }),
      Number("1000000")
    );
    return "voted";
  };

  const distributeFunds = async () => {
    await walletInterface?.executeContractFunction(
      ContractId.fromSolidityAddress(contractAddress.Voting),
      "distributeFunds",
      new ContractFunctionParameterBuilder(),
      Number("1000000")
    );
    return "funds distributed";
  };

  return { addProposal, vote, distributeFunds };
};

export default useVoteContract;
