"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { client } from "@/lib/client";
import revalidate from "@/lib/revalidate-path";
import { useMutation, useQuery } from "convex/react";
import { BookIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { addDays, startOfWeek } from "date-fns";

export default function EventAddDrawer() {
  const faculty = useQuery(api.faculty.getFaculty, {});
  const addWeekItem = useMutation(api.week.addWeekItem);

  const [start, setStart] = useState("08:00");
  const [end, setEnd] = useState("09:00");
  const [day, setDay] = useState("1");
  const [type, setType] = useState("cr");
  const [classrooms, setClassrooms] = useState<Doc<"classrooms">[]>();
  const [selectedClassroom, setSelectedClassroom] =
    useState<Id<"classrooms">>();
  const [name, setName] = useState<string>("");
  const [facultyId, setFacultyId] = useState<Id<"faculty">>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getNextWeekDate = (dayOfWeek: number): Date => {
    const today = new Date();
    const startOfNextWeek = addDays(startOfWeek(today, { weekStartsOn: 1 }), 7);
    return addDays(startOfNextWeek, dayOfWeek - 1);
  };

  const handleSubmit = async () => {
    const eventDate = getNextWeekDate(parseInt(day));
    const id = await addWeekItem({
      classroom: selectedClassroom as Id<"classrooms">,
      day,
      end,
      faculty: facultyId as Id<"faculty">,
      name,
      date: eventDate.toString(),
      start,

      type,
    });
    revalidate("/");
    setName("");
    setDay("1");
    setStart("08:00");
    setEnd("09:00");
    setType("cr");
    setSelectedClassroom(undefined);
    setFacultyId(undefined);
    setClassrooms(undefined);

    setIsDrawerOpen(false);
  };

  const getClassrooms = async () => {
    const classrooms = await client.query(
      api.classroom.getAvailableClassrooms,
      {
        day,
        start,
        end,
        type,
      }
    );
    setClassrooms(classrooms);
  };

  useEffect(() => {
    setClassrooms(undefined);
  }, [day, start, end, type]);

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <BookIcon className="w-10 h-10 mb-2" />
        <h3 className="text-lg font-semibold mb-1">Create Event</h3>
        <p className="text-muted-foreground text-sm">
          Create a temporary event for this week
        </p>
        <Drawer
          direction="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <DrawerTrigger onClick={() => setIsDrawerOpen(true)}>
            <Button size="sm" className="mt-4">
              Create
            </Button>{" "}
          </DrawerTrigger>
          <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Schedule Event</CardTitle>
                <CardDescription>
                  Fill out the form to schedule your event.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter event name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="faculty">Faculty</Label>
                    <Select
                      value={facultyId}
                      onValueChange={(value: Id<"faculty">) =>
                        setFacultyId(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        {faculty?.map((f) => (
                          <SelectItem key={f._id} value={f._id}>
                            {f.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="faculty">Day</Label>
                      <Select
                        value={day}
                        onValueChange={(value) => setDay(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Monday</SelectItem>
                          <SelectItem value="2">Tuesday</SelectItem>
                          <SelectItem value="3">Wednesday</SelectItem>
                          <SelectItem value="4">Thursday</SelectItem>
                          <SelectItem value="5">Friday</SelectItem>
                          <SelectItem value="6">Saturday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="faculty">Type</Label>
                      <Select
                        value={type}
                        onValueChange={(value) => setType(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lab">Lab</SelectItem>
                          <SelectItem value="cr">Lecture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input
                        id="start-time"
                        type="time"
                        defaultValue="08:00"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Input
                        id="end-time"
                        type="time"
                        defaultValue="09:00"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="classroom">Classroom</Label>
                    {classrooms ? (
                      <Select
                        value={selectedClassroom}
                        onValueChange={(value: Id<"classrooms">) =>
                          setSelectedClassroom(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select classroom" />
                        </SelectTrigger>
                        <SelectContent>
                          {classrooms.map((c) => (
                            <SelectItem value={c._id} key={c._id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          getClassrooms();
                        }}
                      >
                        Get available classrooms
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
              <DrawerFooter>
                <Button onClick={handleSubmit}>Submit</Button>
                <DrawerClose onClick={() => setIsDrawerOpen(false)}>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </Card>
          </DrawerContent>
        </Drawer>
      </CardContent>
    </Card>
  );
}
