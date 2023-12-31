import { FC } from "react";
import { cn } from "../lib/utils";

interface AnimatedHrProps {
  classNames?: string;
}

const AnimatedHr: FC<AnimatedHrProps> = ({ classNames }) => {
  return (
    <div
      className={cn(
        "neon-hr w-full border-b-2 border-purple-500/50",
        classNames
      )}
    />
  );
};

export default AnimatedHr;
