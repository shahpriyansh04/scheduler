"use client";
import { ComboboxDemo } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export default function page() {
  const facultyMembers = useQuery(api.faculty.getFaculty, {});
  const [selected, setSelected] = useState<Id<"faculty">>();
  console.log(selected);

  return (
    <div className="mt-20 flex flex-col gap-12 items-center justify-center">
      <h1 className="text-4xl font-bold">Select the faculty member</h1>
      <ComboboxDemo data={facultyMembers} setSelected={setSelected} />
      <Link href={`/faculty-schedule/${selected}`}>
        <Button className="w-[200px] -mt-6">Search</Button>
      </Link>
    </div>
  );
}
