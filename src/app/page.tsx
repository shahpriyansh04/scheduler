/**
 * v0 by Vercel.
 * @see https://v0.dev/t/or9FwvrgA1S
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import ClassAddDrawer from "@/components/ClassAddDrawer";
import ClassroomModal from "@/components/ClassroomModal";
import FacultyModal from "@/components/FacultyModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleUserIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

export default function PageComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto py-12 px-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ClassroomModal />
              <FacultyModal />
              <ClassAddDrawer />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Schedule Search</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <CircleUserIcon className="w-10 h-10 mb-2" />
                  <h3 className="text-lg font-semibold mb-1">
                    Faculty Schedule
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Search for a faculty member's schedule.
                  </p>
                  <Link href="/faculty-schedule">
                    <Button size="sm" className="mt-4">
                      Search
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <PencilIcon className="w-10 h-10 mb-2" />
                  <h3 className="text-lg font-semibold mb-1">
                    Classroom Schedule
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Search for a classroom's schedule.
                  </p>
                  <Link href="/classroom-schedule">
                    <Button size="sm" className="mt-4">
                      Search
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted text-muted-foreground py-4 px-6 mt-auto">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm">
            &copy; 2024 College Class Scheduler. All rights reserved.
          </p>
          <nav className="flex items-center gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
