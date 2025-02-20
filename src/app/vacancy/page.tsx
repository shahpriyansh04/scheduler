"use client";
import { ComboboxDemo } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export default function page() {
  const facultyMembers = useQuery(api.classroom.getClassrooms, {});
  const [selected, setSelected] = useState<Id<"classrooms">>();
  const [day, setDay] = useState<string>("");

  console.log(selected);
  console.log(day);

  return (
    <div className="mt-20 flex flex-col gap-12 items-center justify-center">
      <h1 className="text-4xl font-bold">Select the day of the week</h1>
      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="w-[200px] p-2 border rounded"
      >
        <option value="" disabled>
          Select a day
        </option>
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>
      </select>
      <Link href={`/vacancy/${day}`}>
        <Button className="w-[200px] -mt-6">Search</Button>
      </Link>
    </div>
  );
}
