import { ArrowBack } from "@mui/icons-material";
import AnimatedHr from "../components/AnimatedHr";
import { useNavigate, useParams } from "react-router-dom";
import { proposals } from "../constants/data";

interface ProposalPageProps {}

const ProposalPage = ({}: ProposalPageProps) => {
  const navigate = useNavigate();
  const { name } = useParams();

  const proposal = proposals.find(
    (proposal) => proposal.name === name?.replaceAll("-", " ")
  );

  if (!proposal) return null;

  return (
    <div className="max-w-screen-lg px-4 mx-auto mt-8">
      <button
        className="mb-8 p-2 bg-purple-900/10 rounded-md transition text-zinc-400 hover:text-zinc-100 hover:bg-purple-900/30"
        onClick={() => navigate(-1)}
      >
        <ArrowBack fontSize="medium" />
      </button>
      <h1 className="text-2xl mb-4 md:text-3xl font-medium w-full">
        {proposal.name}
      </h1>

      <AnimatedHr />

      <p className="text-xs text-purple-700 mb-2 mt-6 tracking-wide font-semibold w-full">
        ABOUT THIS PROPOSAL
      </p>
      <p className="md:text-lg">
        Cat gets stuck in tree firefighters try to get cat down firefighters get
        stuck in tree cat eats firefighters' slippers kitty power ignore the
        squirrels, you'll never catch them anyway for what a cat-ass-trophy! or
        purr as loud as possible, be the most annoying cat that you can, and,
        knock everything off the table.
      </p>
    </div>
  );
};

export default ProposalPage;
