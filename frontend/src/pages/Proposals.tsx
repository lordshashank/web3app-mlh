import AnimatedHr from "../components/AnimatedHr";

const Proposals = () => {
  return (
    <div className="max-w-screen-lg px-4 mx-auto mt-16">
      <h1 className="text-2xl mb-4 md:text-3xl font-medium">
        Current Proposals
      </h1>
      <AnimatedHr />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 mt-6 lg:grid-cols-4">
        {data.map((item, index) => (
          <div
            className="flex border-2 py-8 px-4 items-center justify-center overflow-hidden text-center rounded-lg border-purple-600/40 flex-col gap-4"
            key={index}
          >
            <p className="text-lg break-words">{item.name}</p>
            <div className="space-y-0">
              <p className="text-xs font-semibold text-zinc-500">TOTAL FUNDS</p>
              <p className="text-purple-600 text-xl tracking-[0.15em] font-medium">
                {item.totalFunds}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proposals;

const data = [
  {
    name: "Idk",
    totalFunds: 1234,
  },
  {
    name: "A random proposal",
    totalFunds: 54,
  },
  {
    name: "The name of the proposal",
    totalFunds: 5468546,
  },
  {
    name: "Idk omg",
    totalFunds: 21321,
  },
];
