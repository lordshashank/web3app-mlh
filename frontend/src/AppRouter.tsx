import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Proposals from "./pages/Proposals";
import ProposalPage from "./pages/ProposalPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/proposals/:proposalID" element={<ProposalPage />} />
      </Routes>
    </Router>
  );
}
