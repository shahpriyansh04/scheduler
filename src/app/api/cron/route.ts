import { NextResponse } from "next/server";

import { ConvexHttpClient, ConvexClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
export async function GET() {
  const client = new ConvexClient("https://optimistic-kudu-997.convex.cloud");
  client.mutation(api.week.emptyAndPopulateWeekTable, {}).then((response) => {
    console.log(response);
  });

  return NextResponse.json({ ok: true });
}
