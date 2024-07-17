import CalendarView from "@/components/Calendar";
import events2 from "./events";
import ClassAddDrawer from "@/components/ClassAddDrawer";
import FacultyModal from "@/components/FacultyModal";
import ClassroomModal from "@/components/ClassroomModal";
import { client } from "@/lib/client";
import { api } from "../../convex/_generated/api";
import { revalidatePath } from "next/cache";

export default async function PageComponent() {
  revalidatePath("/");

  const events = await client.query(api.event.getEvents);

  return (
    <main className="h-screen flex items-center ">
      <div className="w-full p-12">
        <div className="flex gap-3">
          <ClassAddDrawer />
          <FacultyModal />
          <ClassroomModal />
        </div>
        <CalendarView events={events} />
      </div>
    </main>
  );
}
