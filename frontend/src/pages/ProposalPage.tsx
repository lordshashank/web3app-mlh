import { ArrowBack } from "@mui/icons-material";
import AnimatedHr from "../components/AnimatedHr";
import { useNavigate } from "react-router-dom";

interface ProposalPageProps {}

const ProposalPage = ({}: ProposalPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-lg px-4 mx-auto mt-8">
      <button
        className="mb-8 p-2 bg-purple-900/10 rounded-md"
        onClick={() => navigate(-1)}
      >
        <ArrowBack fontSize="medium" />
      </button>
      <h1 className="text-2xl mb-4 md:text-3xl font-medium">Proposal name</h1>
      <AnimatedHr />
    </div>
  );
};

export default ProposalPage;
