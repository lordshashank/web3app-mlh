import { useNavigate } from "react-router-dom";
import VoteModal from "./VoteModal";
import { useState } from "react";
import { Button } from "@mui/material";

interface ProjectCardProps {
  proposalName: string;
  project: any;
}

const ProjectCard = ({ project, proposalName }: ProjectCardProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div
      key={project.id}
      //   role="button"
      //   onClick={() =>
      //     navigate(
      //       `/proposals/${proposalName}/${project.title.replaceAll(" ", "-")}`
      //     )
      //   }
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
              setOpen(true);
            }}
            className="w-full"
            variant="outlined"
            size="small"
          >
            Vote
          </Button>
          <VoteModal
            name={project.title}
            open={open}
            onClose={() => setOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
