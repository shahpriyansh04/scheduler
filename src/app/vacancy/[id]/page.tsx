import { client } from "@/lib/client";
import { api } from "../../../../convex/_generated/api";
import CalendarView from "@/components/Calendar";
import { revalidatePath } from "next/cache";
import { Id } from "../../../../convex/_generated/dataModel";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function Page({ params }: { params: { id: string } }) {
  revalidatePath(`/vacancy/${params.id}`);
  const vacancies = await client.query(api.week.getVacancyForDay, {
    day: params.id,
  });

  console.log(vacancies);

  const dayName = daysOfWeek[parseInt(params.id, 10)];

  return (
    <div className="mt-20 w-full flex flex-col gap-12 items-center justify-center">
      <h1 className="text-4xl font-bold">Timetable for {dayName}</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time Slot
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vacancies
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.entries(vacancies).map(([classroom, vacancyList]) => (
            <tr key={classroom}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {classroom}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {vacancyList.length > 0
                  ? vacancyList.map((vacancy) => (
                      <p key={`${classroom}-${vacancy.start}-${vacancy.end}`}>
                        {vacancy.start} - {vacancy.end}
                      </p>
                    ))
                  : "No vacancies"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
