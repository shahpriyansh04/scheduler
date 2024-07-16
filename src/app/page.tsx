import CalendarView from "@/components/Calendar";
import events from "./events";

export default function PageComponent() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className=" w-full p-12">
        <CalendarView events={events} />
      </div>
    </main>
  );
}
