import CalendarView from "@/components/Calendar";
import events from "./events";
import ClassAddDrawer from "@/components/ClassAddDrawer";
import FacultyModal from "@/components/FacultyModal";
import ClassroomModal from "@/components/ClassroomModal";

export default function PageComponent() {
  return (
    <main className="h-screen flex items-center ">
      <div className=" w-full p-12">
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
