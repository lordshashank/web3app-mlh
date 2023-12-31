import { ArrowBack } from "@mui/icons-material";
import AnimatedHr from "../components/AnimatedHr";
import { useNavigate, useParams } from "react-router-dom";
import { projects, proposals } from "../constants/data";
import { Button } from "@mui/material";
import AddProjectModal from "../components/AddProjectModal";
import VoteModal from "../components/VoteModal";
import ProjectCard from "../components/ProjectCard";
import useVoteContract from "../hooks/useVotingContract";
const ProposalPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const { distributeFunds } = useVoteContract();

  const proposal = proposals.find(
    (proposal) => proposal.name === name?.replaceAll("-", " ")
  );

  if (!proposal) return null;

  return (
    <div className="max-w-screen-lg mb-8 px-4 mx-auto mt-8">
      <button
        className="mb-8 p-2 bg-purple-900/10 rounded-md transition text-zinc-400 hover:text-zinc-100 hover:bg-purple-900/30"
        onClick={() => navigate(-1)}
      >
        <ArrowBack fontSize="medium" />
      </button>
      <div className="flex mb-4 gap-4 max-md:flex-col justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-medium w-full">
          {proposal.name}
        </h1>
        <Button
          className="max-md:w-full"
          size="small"
          variant="outlined"
          onClick={async () => {
            distributeFunds();
          }}
        >
          Distribute Prizes
        </Button>
      </div>

      <AnimatedHr />

      <p className="text-xs text-purple-700 mb-2 mt-6 tracking-wide font-semibold w-full">
        ABOUT THIS PROPOSAL
      </p>
      <p className="md:text-lg">
        This is a funding proposal for the {proposal.name} project. This would
        distribute funds worth {proposal.totalFunds} HBAR to{" "}
        {proposal.projectLimit} projects. It uses quadratic voting to determine
        the amount of funds each project receives.
      </p>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="aspect-video rounded-lg border-purple-600/30 relative grid place-items-center border-2 p-2">
          <span className="max-md:text-xs text-sm absolute top-2 left-2">
            Voting Factor
          </span>
          <span className="text-xl text-purple-500 max-md:text-lg font-medium tracking-widest">
            {proposal.votingFactor}
          </span>
        </div>

        <div className="aspect-video rounded-lg border-purple-600/30 relative grid place-items-center border-2 p-2">
          <span className="max-md:text-xs text-sm absolute top-2 left-2">
            Total Funds
          </span>
          <span className="text-xl text-purple-500 max-md:text-lg font-medium tracking-widest">
            {proposal.totalFunds}
          </span>
        </div>

        <div className="aspect-video rounded-lg border-purple-600/30 relative grid place-items-center border-2 p-2">
          <span className="max-md:text-xs text-sm absolute top-2 left-2">
            Total Votes Per Voter
          </span>
          <span className="text-xl text-purple-500 max-md:text-lg font-medium tracking-widest">
            {proposal.totalVotesPerVoter}
          </span>
        </div>

        <div className="aspect-video rounded-lg border-purple-600/30 relative grid place-items-center border-2 p-2">
          <span className="max-md:text-xs text-sm absolute top-2 left-2">
            Project Limit
          </span>
          <span className="text-xl text-purple-500 max-md:text-lg font-medium tracking-widest">
            {proposal.projectLimit}
          </span>
        </div>
      </div>

      <h2 className="mt-8 mb-2 text-xl md:text-2xl">Projects</h2>
      <AnimatedHr />

      <div className="grid mt-6 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => (
          <a
            href="https://web3apps-19837.devpost.com/submissions/463866-hedfund"
            target="_blank"
          >
            <ProjectCard
              key={project.id}
              project={project}
              proposalName={name!}
            />
          </a>
        ))}
        <AddProjectModal />
      </div>
    </div>
  );
};

export default ProposalPage;
