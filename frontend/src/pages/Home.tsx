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
export default function Home() {
  const { walletInterface } = useWalletInterface();
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
    <Stack alignItems="center" spacing={4}>
      <Typography variant="h4" color="white">
        Let's buidl a dApp on Hedera
      </Typography>
      {walletInterface !== null && (
        <>
          <Stack direction="row" gap={2} alignItems="center">
            <Typography>Transfer</Typography>
            <TextField
              type="number"
              label="amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              sx={{
                maxWidth: "100px",
              }}
            />
            <Typography>HBAR to</Typography>
            <TextField
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
              label="account id or evm address"
            />
            <Button
              variant="contained"
              onClick={async () => {
                const txId = await walletInterface.transferHBAR(
                  AccountId.fromString(toAccountId),
                  amount
                );
              }}
            >
              <SendIcon />
            </Button>
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
          </Stack>
        </>
      )}
    </Stack>
  );
}
