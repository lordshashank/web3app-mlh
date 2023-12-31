import { Box } from "@mui/material";
import BuiltOnHedera from "../assets/built-on-hedera.svg";

export default function Footer() {
  return (
    <div className="flex p-4 flex-col shadow-[0_-4px_20px_#00000033]">
      <div className="max-w-screen-lg mx-auto w-full">
        <img
          src={BuiltOnHedera}
          alt="An upper case H with a line through the top and the text Build on Hedera"
          className="builtOnHederaSVG"
        />
      </div>
    </div>
  );
}
