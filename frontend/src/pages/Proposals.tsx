import { useNavigate } from "react-router-dom";
import AnimatedHr from "../components/AnimatedHr";
import { ArrowBack } from "@mui/icons-material";
import { proposals } from "../constants/data";

const Proposals = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-lg px-4 mx-auto mt-8">
      <button
        className="mb-8 p-2 bg-purple-900/10 rounded-md transition text-zinc-400 hover:text-zinc-100 hover:bg-purple-900/30"
        onClick={() => navigate(-1)}
      >
        <ArrowBack fontSize="medium" />
      </button>
      <h1 className="text-2xl mb-4 md:text-3xl font-medium">
        Current Proposals
      </h1>
      <AnimatedHr />

      {proposals ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 mt-6 lg:grid-cols-4">
          {proposals.map((item, index) => (
            <div
              key={index}
              role="button"
              onClick={() =>
                navigate(`/proposals/${item.name.replaceAll(" ", "-")}`)
              }
              className="flex border-2 py-8 px-4 items-center justify-center overflow-hidden text-center rounded-lg border-purple-600/30 transition hover:border-purple-600/50 flex-col hover:scale-[1.1] gap-4"
            >
              <p className="text-lg break-words">{item.name}</p>
              <div className="space-y-0">
                <p className="text-xs font-semibold text-zinc-500">
                  TOTAL FUNDS
                </p>
                <p className="text-purple-600 text-xl tracking-[0.15em] font-medium">
                  {item.totalFunds}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 max-md:text-sm text-zinc-400">
          No proposals to display at this time.
        </p>
      )}
    </div>
  );
};

export default Proposals;
