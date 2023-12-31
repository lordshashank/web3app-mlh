import { AddCircle } from "@mui/icons-material";
import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useVoteContract from "../hooks/useVotingContract";
type formSchema = {
  name: string;
  description: string;
  externalLinks: string[];
  imageUrl: string;
};

const AddProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addProposal } = useVoteContract();

  const { register, handleSubmit } = useForm<formSchema>({
    defaultValues: {
      name: "",
      description: "",
      externalLinks: [],
      imageUrl: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      await addProposal(values.name);
      console.log(values);
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex gap-4 hover:scale-110 transition flex-col justify-center items-center border aspect-[11/16] border-purple-900"
      >
        <p className="transition group-hover:text-purple-500">Add Project</p>
        <AddCircle className="transition group-hover:text-purple-500" />
      </button>

      <Dialog
        className="backdrop-blur-sm"
        onClose={() => setIsOpen(false)}
        open={isOpen}
      >
        <DialogContent className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] md:w-[500px] from-[#161c26] via-gray-900 to-slate-900 shadow-lg shadow-black/30">
          <h2 className="text-left w-full md:text-3xl text-2xl font-semibold mt-4 md:px-4">
            Add a project
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 md:px-4 mb-4"
          >
            <div className="border-t-2 w-full border-slate-800 mt-4" />
            <div className="border border-dashed border-zinc-500 w-full relative h-40">
              <Button
                component="label"
                className="border border-white w-full h-40"
              >
                Upload File
                <input type="file" hidden className="absolute inset-0" />
              </Button>
            </div>

            <TextField {...register("name")} label="Project name" />

            <TextField
              {...register("description")}
              label="Description"
              multiline
              rows={8}
            />

            <div className="border-t-2 w-full border-slate-800 mb-4" />

            <Button type="submit" className="w-full" variant="contained">
              Create New Project
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProjectModal;
