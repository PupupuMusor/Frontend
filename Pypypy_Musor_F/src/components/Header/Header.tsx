import { cn } from "@/lib/utils";
import { Container } from "../shared/container";
import { ChartNoAxesColumnIncreasing } from "lucide-react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <img src="/logo.svg" alt="Logo" width={95} height={95} />

        <ChartNoAxesColumnIncreasing className="text-amber-400 w-24 h-24 " />
      </Container>
    </header>
  );
};
