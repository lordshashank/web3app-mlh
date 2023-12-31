import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import HBARLogo from "../assets/hbar-logo.svg";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { WalletSelectionDialog } from "./WalletSelectionDialog";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { accountId, walletInterface } = useWalletInterface();

  const handleConnect = async () => {
    if (accountId) {
      walletInterface?.disconnect();
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (accountId) {
      setOpen(false);
    }
  }, [accountId]);

  return (
    <div className="shadow-[0_4px_20px_#00000022] p-4 md:px-6 py-4">
      <div className="max-w-screen-lg w-full max-md:flex-col gap-4 flex justify-between items-center mx-auto">
        <div className="flex justify-center items-center">
          <img
            src={HBARLogo}
            alt="An upper case H with a line through the top"
            className="ml-auto hbarLogoImg"
          />
          <p className="text-white font-semibold ml-2 text-">HedFund</p>
        </div>
        <button
          title={accountId ? `Connected: ${accountId}` : "Connect Wallet"}
          className="text-nowrap rounded-md truncate px-3 py-1.5 max-w-xs overflow-x-hidden bg-purple-600 max-md:text-sm"
          onClick={handleConnect}
        >
          {accountId ? `Connected: ${accountId}` : "Connect Wallet"}
        </button>
      </div>
      <WalletSelectionDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
