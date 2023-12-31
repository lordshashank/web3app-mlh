import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import deployVotingContract from "../hooks/deployVotingContract";
import { useNavigate } from "react-router-dom";
interface ConfigureProposalProps {}

type formSchema = {
  name: string;
  votingFactor: number;
  votesPerVoter: number;
  projectLimit: number;
  totalFunds: number;
};

const ConfigureProposal = ({}: ConfigureProposalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const deployContract = deployVotingContract();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<formSchema>({
    defaultValues: {
      name: "",
      projectLimit: 0,
      totalFunds: 0,
      votesPerVoter: 0,
      votingFactor: 0,
    },
  });

  const onSubmit = async (values: formSchema) => {
    try {
      await deployContract(
        values.votingFactor,
        values.votesPerVoter,
        values.projectLimit,
        values.totalFunds
      );
      console.log(values);
      navigate("/proposals");
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        size="large"
        className="w-full"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add Funding Proposal
      </Button>

      <Dialog
        className="backdrop-blur-sm"
        onClose={() => setIsOpen(false)}
        open={isOpen}
      >
        <DialogContent className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] md:w-[500px] from-[#161c26] via-gray-900 to-slate-900 shadow-lg shadow-black/30">
          <h2 className="text-left w-full md:text-3xl text-2xl font-semibold mt-4 md:px-4">
            Configure Funding Proposal
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 md:px-4 mb-4"
          >
            <div className="border-t-2 w-full border-slate-800 mt-4" />

            <TextField {...register("name")} label="Proposal name" />

            <div className="flex gap-3 items-center">
              <TextField
                {...register("votingFactor")}
                type="number"
                label="Voting factor"
              />

              <TextField
                {...register("votesPerVoter")}
                type="number"
                label="Total votes per voter"
              />
            </div>

            <div className="flex gap-3 items-center">
              <TextField
                {...register("projectLimit")}
                type="number"
                label="Project limit"
              />

              <TextField
                {...register("totalFunds")}
                type="number"
                label="Total funds"
              />
            </div>

            <div className="border-t-2 w-full border-slate-800 mb-4" />

            <Button type="submit" className="w-full" variant="contained">
              Deploy Contract
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfigureProposal;
