import { cn } from "@/utils/utils";
import { Container } from "../shared/container";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { useState } from "react";
import { RatingModal } from "../modals/RatingModal";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  return (
    <>
      <header className={cn("border-b", className)}>
        <Container className="flex items-center justify-between py-8">
          <img src="/logo.svg" alt="Logo" width={95} height={95} />

          <ChartNoAxesColumnIncreasing
            onClick={() => setIsRatingOpen(true)}
            className="text-amber-400 w-24 h-24 cursor-pointer"
          />
        </Container>
      </header>
      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
      />
    </>
  );
};
