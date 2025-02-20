import { client } from "@/lib/client";
import { api } from "../../../../convex/_generated/api";
import CalendarView from "@/components/Calendar";
import { revalidatePath } from "next/cache";
import { Id } from "../../../../convex/_generated/dataModel";

export default async function Page({ params }: { params: { id: string } }) {
  revalidatePath(`/vacancy/${params.id}`);
  const vacancies = await client.query(api.week.getVacancyForDay, {
    day: params.id,
  });

  console.log(vacancies);

  return (
    <div className="mt-20 w-full flex flex-col gap-12 items-center justify-center">
      {JSON.stringify(vacancies)}
    </div>
  );
}
