// Import necessary modules and components from external libraries
import { AccountId, ContractId, TokenId } from "@hashgraph/sdk";
import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";

// Define the main component for the Home page
export default function Home() {
  // Access the wallet interface using a custom hook
  const { walletInterface } = useWalletInterface();

  // Define state variables for the recipient's account ID and the amount to transfer
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState(1);

  return (
    // Use a stack layout with centered alignment and specified spacing
    <Stack alignItems="center" spacing={4}>
      {/* Display a heading with a message */}
      <Typography
        variant="h4"
        color="white"
      >
        Let's buidl a dApp on Hedera
      </Typography>

      {/* Check if the wallet interface is available */}
      {walletInterface !== null && (
        <>
          {/* Display a stack layout for transfer input fields and button */}
          <Stack
            direction='row'
            gap={2}
            alignItems='center'
          >
            {/* Display a label for the transfer operation */}
            <Typography>
              Transfer
            </Typography>

            {/* Input field for specifying the amount to transfer */}
            <TextField
              type='number'
              label='amount'
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              sx={{
                maxWidth: '100px'
              }}
            />

            {/* Display a label for the recipient's account */}
            <Typography>
              HBAR to
            </Typography>

            {/* Input field for specifying the recipient's account ID or EVM address */}
            <TextField
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
              label='account id or evm address'
            />

            {/* Button for initiating the transfer */}
            <Button
              variant='contained'
              onClick={async () => {
                // Initiate the HBAR transfer using the wallet interface
                const txId = await walletInterface.transferHBAR(AccountId.fromString(toAccountId), amount);
              }}
            >
              {/* Icon for the transfer button */}
              <SendIcon />
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  )
}
