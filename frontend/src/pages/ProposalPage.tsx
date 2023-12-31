import { AddCircle, ArrowBack } from "@mui/icons-material";
import AnimatedHr from "../components/AnimatedHr";
import { useNavigate, useParams } from "react-router-dom";
import { projects, proposals } from "../constants/data";
import { Button } from "@mui/material";

interface ProposalPageProps {}

const ProposalPage = ({}: ProposalPageProps) => {
  const navigate = useNavigate();
  const { name } = useParams();

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
        <Button className="max-md:w-full" size="small" variant="outlined">
          Distribute Prizes
        </Button>
      </div>

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
          <div
            key={project.id}
            role="button"
            onClick={() =>
              navigate(
                `/proposals/${name}/${project.title.replaceAll(" ", "-")}`
              )
            }
            className="border relative transition hover:scale-110 border-purple-900/50 aspect-[11/16] flex flex-col"
          >
            <div className="aspect-[16/10] relative">
              <img
                src={project.imageUrl}
                alt={project.description}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full flex-col flex items-center flex-1">
              <p className="mt-4 drop-shadow-md">{project.title}</p>

              <span className="text-xs text-zinc-400 mt-8">TOTAL VOTES</span>
              <p className="font-semibold mb-2 tracking-widest text-purple-700">
                {project.totalVotes}
              </p>
              <div className="absolute left-1 right-1 bottom-1">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Voted!");
                  }}
                  className="w-full"
                  variant="outlined"
                  size="small"
                >
                  Vote
                </Button>
              </div>
            </div>
          </div>
        ))}
        <button className="group flex gap-4 hover:scale-110 transition flex-col justify-center items-center border aspect-[11/16] border-purple-900">
          <p className="transition group-hover:text-purple-500">Add Project</p>
          <AddCircle className="transition group-hover:text-purple-500" />
        </button>
      </div>
    </div>
  );
};

export default ProposalPage;
