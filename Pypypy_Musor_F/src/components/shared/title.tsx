import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Title: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className="mx-auto max-w-4xl py-5 md:py-7 bg-amber-200 text-center rounded-3xl px-4">
      <div
        className={cn(
          "mx-auto max-w-5xl text-3xl md:text-5xl font-semibold",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
