// Import necessary modules and components from external libraries
import { AccountId, ContractId, TokenId } from "@hashgraph/sdk";
import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import useVoteContract from "../hooks/useVotingContract";
import deployVotingContract from "../hooks/deployVotingContract";
import useVotingContractData from "../hooks/useVotingContractData";
import ConfigureProposal from "../components/ConfigureProposal";
export default function Home() {
  // Access the wallet interface using a custom hook
  const { walletInterface } = useWalletInterface();

  // Define state variables for the recipient's account ID and the amount to transfer
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState(1);
  const { addProposal, vote, distributeFunds } = useVoteContract();
  const {
    getVotingFactor,
    getTotalFunds,
    getTotalVotesPerVoter,
    getProposalLimit,
    getOwner,
    getVoter,
    getProposal,
  } = useVotingContractData();
  const deployContract = deployVotingContract();
  return (
    <div className="mx-auto pb-8 px-4 text-center max-w-screen-lg mt-16">
      <p className="text-5xl md:text-6xl max-w-2xl mx-auto font-medium">
        Let's build a dApp on Hedera!
      </p>

      {walletInterface !== null && (
        <>
          <p className="max-md:text-sm font-light w-fit mx-auto text-zinc-400 tracking-wider mt-16 mb-6">
            Transfer Funds
          </p>
          <div className="flex gap-x-2 justify-center items-center">
            <p>Transfer</p>
            <TextField
              type="number"
              label="amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              sx={{
                maxWidth: "150px",
              }}
            />
            <p>HBAR to</p>
            <TextField
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
              label="account id or evm address"
            />

            {/* Button for initiating the transfer */}
            <Button
              variant="contained"
              onClick={async () => {
                const txId = await walletInterface.transferHBAR(
                  AccountId.fromString(toAccountId),
                  amount
                );
              }}
            >
              {/* Icon for the transfer button */}
              <SendIcon />
            </Button>
          </div>

          <p className="max-md:text-sm font-light w-fit mx-auto text-zinc-400 tracking-wider mt-16 mb-6">
            Other Features
          </p>
          <div className="flex justify-center gap-4 max-md:flex-col">
            <Button
              variant="contained"
              onClick={async () => {
                await deployContract(2, 100, 10, 1);
              }}
            >
              deploy contract
            </Button>
            <Button
              variant="contained"
              onClick={async () => {
                await addProposal("test");
              }}
            >
              add proposal
            </Button>
            <Button
              variant="contained"
              onClick={async () => {
                const proposal = await getProposal(0);
                // console.log(proposal);
              }}
            >
              get proposal
            </Button>
          </div>

          <div className="mt-8">
            <ConfigureProposal />
          </div>
        </>
      )}
    </div>
  );
}
