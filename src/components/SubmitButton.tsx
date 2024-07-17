"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className={cn(pending && "cursor-not-allowed", "w-full mt-6")}
      disabled={pending}
    >
      <Loader2
        className={cn(pending ? "block animate-spin mr-3 w-4 h-4" : "hidden")}
      />
      Submit
    </Button>
  );
}
