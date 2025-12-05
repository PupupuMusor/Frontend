import { cn } from "@/lib/utils";
import { Container } from "../shared/container";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <Button>Hello</Button>
        <ChartNoAxesColumnIncreasing />
      </Container>
    </header>
  );
};
