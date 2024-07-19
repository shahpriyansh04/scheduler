import { client } from "@/lib/client";
import { api } from "../../../../convex/_generated/api";
import CalendarView from "@/components/Calendar";
import { revalidatePath } from "next/cache";
import { Id } from "../../../../convex/_generated/dataModel";

export default async function Page({ params }: { params: { id: string } }) {
  revalidatePath(`/faculty-schedule/${params.id}`);
  const events = await client.query(api.event.getClassroomEvents, {
    id: params.id as Id<"classrooms">,
  });
  const classroom = await client.query(api.classroom.getClassroomById, {
    id: params.id as Id<"classrooms">,
  });

  return (
    <div className="mt-20 w-full flex flex-col gap-12 items-center justify-center">
      <h1 className="text-4xl font-bold">Timetable for {classroom[0].name}</h1>
      <CalendarView defaultView="week" events={events} />
    </div>
  );
}
