import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import deployVotingContract from "../hooks/deployVotingContract";
interface ConfigureProposalProps {}

type formSchema = {
  votingFactor: number;
  votesPerVoter: number;
  proposalLimit: number;
  totalFunds: number;
};

const ConfigureProposal = ({}: ConfigureProposalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const deployContract = deployVotingContract();

  const { register, handleSubmit } = useForm<formSchema>({
    defaultValues: {
      proposalLimit: 0,
      totalFunds: 0,
      votesPerVoter: 0,
      votingFactor: 0,
    },
  });

  const onSubmit = async (values: formSchema) => {
    await deployContract(
      values.votingFactor,
      values.votesPerVoter,
      values.proposalLimit,
      values.totalFunds
    );
    console.log(values);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        configure funding proposal
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
            className="flex flex-col gap-3 md:px-4 mb-4"
          >
            <div className="border-t-2 w-full border-slate-800 my-4" />
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

            <TextField
              {...register("proposalLimit")}
              type="number"
              label="Proposal limit"
            />

            <TextField
              {...register("totalFunds")}
              type="number"
              label="Total funds"
            />

            <div className="border-t-2 w-full border-slate-800 my-4" />

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
