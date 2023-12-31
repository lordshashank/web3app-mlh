import Footer from "./components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/Navbar";
import { ThemeProvider } from "@mui/material";
import { AllWalletsProvider } from "./services/wallets/AllWalletsProvider";
import AppRouter from "./AppRouter";
import { theme } from "./theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AllWalletsProvider>
        <CssBaseline />
        <div className="flex bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-zinc-950 flex-col min-h-[100dvh]">
          <header>
            <NavBar />
          </header>
          <div className="flex-1 p-3">
            <AppRouter />
          </div>
          <Footer />
        </div>
      </AllWalletsProvider>
    </ThemeProvider>
  );
}

export default App;
