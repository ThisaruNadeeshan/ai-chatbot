"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { WrenchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "./icons";

export function ToolsSelector({
  enableWebSearch,
  onWebSearchToggle,
}: {
  enableWebSearch: boolean;
  onWebSearchToggle?: (enabled: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-8 px-2"
          data-testid="tools-selector"
          variant="ghost"
        >
          <WrenchIcon className="size-4" />
          <span className="hidden font-medium text-xs sm:block">Tools</span>
          <ChevronDownIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[200px]"
      >
        <DropdownMenuLabel>Available Features</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={enableWebSearch}
          className="py-2"
          onCheckedChange={(checked) => {
            onWebSearchToggle?.(checked);
          }}
        >
          <div className="flex items-start gap-3 w-full">
            <SearchIcon className="size-4 mt-0.5 shrink-0" />
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="font-medium text-sm">Web Search</span>
              <span className="text-muted-foreground text-xs leading-relaxed">
                Search the web for current information
              </span>
            </div>
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

