"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function ComboboxDemo({ data, setSelected }: any) {
  const [open, setOpen] = React.useState(false);
  // Change the state to hold the selected item's ID
  const [selectedId, setSelectedId] = React.useState("");

  // Find the selected item based on the selectedId
  const selectedItem = data?.find((item: any) => item._id === selectedId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedItem ? selectedItem.name : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandList>
            {data?.map((item: any) => (
              <CommandItem
                key={item._id}
                value={item.name} // Keep this as name for display purposes
                onSelect={() => {
                  // Set the selectedId to the item's id
                  setSelectedId(item._id === selectedId ? "" : item._id);
                  setSelected(item._id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedId === item._id ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
