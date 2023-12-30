// Importing required components and functions from Material-UI and custom services
import { Button, Dialog, Stack } from "@mui/material";
import { connectToBladeWallet } from "../services/wallets/blade/bladeClient";
import { hashConnect } from "../services/wallets/hashconnect/hashconnectClient";
import { connectToMetamask } from "../services/wallets/metamask/metamaskClient";
import HashPackLogo from "../assets/hashpack-logo.svg";
import MetamaskLogo from "../assets/metamask-logo.svg";

// Define the props for the WalletSelectionDialog component
interface WalletSelectionDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

// WalletSelectionDialog component for displaying wallet options
export const WalletSelectionDialog = (props: WalletSelectionDialogProps) => {
  // Destructure props to get open and onClose
  const { onClose, open } = props;

  return (
    // Dialog component from Material-UI for displaying a modal
    <Dialog onClose={onClose} open={open}>
      {/* Stack component to organize buttons in a vertical stack */}
      <Stack p={2} gap={1}>
        {/* Button for connecting to HashPack wallet */}
        <Button
          variant="contained"
          onClick={() => {
            // Call the connectToLocalWallet function from hashConnect service
            hashConnect.connectToLocalWallet();
          }}
        >
          {/* HashPack wallet logo */}
          <img
            src={HashPackLogo}
            alt='hashpack logo'
            className='walletLogoImage'
            style={{
              marginLeft: '-6px'
            }}
          />
          HashPack
        </Button>
        {/* Button for connecting to Blade wallet */}
        <Button
          variant="contained"
          onClick={() => {
            // Call the connectToBladeWallet function
            connectToBladeWallet();
          }}
        >
          Blade
        </Button>
        {/* Button for connecting to Metamask wallet */}
        <Button
          variant="contained"
          onClick={() => {
            // Call the connectToMetamask function
            connectToMetamask();
          }}
        >
          {/* Metamask wallet logo */}
          <img
            src={MetamaskLogo}
            alt='metamask logo'
            className='walletLogoImage'
            style={{
              padding: '4px 4px 4px 0px'
            }}
          />
          Metamask
        </Button>
      </Stack>
    </Dialog>
  );
}
