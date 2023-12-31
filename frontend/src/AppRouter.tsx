import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from "./pages/Home";
import Gemini from "./pages/Gemini";


export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gemini" element={<Gemini />} />
      </Routes>
    </Router>
  )
}