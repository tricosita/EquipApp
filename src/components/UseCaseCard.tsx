"use client";

import { UseCase } from "@/types/equipment";
import { ArrowRight } from "lucide-react";

interface UseCaseCardProps {
  useCase: UseCase;
  onSelect: (useCase: UseCase) => void;
}

export function UseCaseCard({ useCase, onSelect }: UseCaseCardProps) {
  return (
    <button
      onClick={() => onSelect(useCase)}
      className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card p-5 text-left transition-all hover:border-primary/30 hover:bg-card/80 card-hover w-full"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-2xl transition-colors group-hover:bg-primary/20">
        {useCase.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {useCase.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
          {useCase.description}
        </p>
      </div>
      <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
    </button>
  );
}
