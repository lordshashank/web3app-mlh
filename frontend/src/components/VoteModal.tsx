import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useVoteContract from "../hooks/useVotingContract";
type formSchema = {
  voteAmount: number;
};

interface VoteModalProps {
  name: string;
  onClose: () => void;
  open: boolean;
}

const VoteModal = ({ name, onClose, open }: VoteModalProps) => {
  const { vote } = useVoteContract();
  const { register, handleSubmit } = useForm<formSchema>({
    defaultValues: {
      voteAmount: 1,
    },
  });
  const onSubmit = async (values: formSchema) => {
    try {
      await vote(0, values.voteAmount);
      console.log(values);
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  };

  return (
    <>
      <Dialog className="backdrop-blur-sm" onClose={onClose} open={open}>
        <DialogContent className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] md:w-[500px] from-[#161c26] via-gray-900 to-slate-900 shadow-lg shadow-black/30">
          <h2 className="text-left w-full md:text-3xl text-2xl font-semibold mt-4 md:px-4">
            Vote for <span className="text-purple-500">{name}</span>
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 md:px-4 mb-4"
          >
            <div className="border-t-2 w-full border-slate-800 mt-4" />
            <TextField
              type="number"
              label="Your vote"
              InputProps={{ inputProps: { min: 1, max: 100 } }}
            />

            <div className="border-t-2 w-full border-slate-800 mb-4" />

            <Button type="submit" className="w-full" variant="contained">
              Cast Your Vote
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VoteModal;
