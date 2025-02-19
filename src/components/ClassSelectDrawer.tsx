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
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "../../convex/_generated/dataModel";

export default function ClassSelectDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  selectedEvent,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  selectedEvent: Doc<"event">;
}) {
  console.log(selectedEvent);

  const faculty = useQuery(api.faculty.getFaculty, {});
  const createEvent = useMutation(api.event.createEvent);
  const deleteEvent = useMutation(api.event.deleteEvent);
  const [start, setStart] = useState<string>(selectedEvent?.start || "");
  const [end, setEnd] = useState<string>(selectedEvent?.end || "");
  const [day, setDay] = useState<string>(selectedEvent?.day || "");
  const [type, setType] = useState<string | undefined>(selectedEvent?.type);
  const [classrooms, setClassrooms] = useState<Doc<"classrooms">[]>();
  const [selectedClassroom, setSelectedClassroom] = useState<
    Id<"classrooms"> | undefined
  >(selectedEvent?.classroom);
  const [name, setName] = useState<string | undefined>(selectedEvent?.name);
  const [facultyId, setFacultyId] = useState<Id<"faculty"> | undefined>(
    selectedEvent?.faculty
  );

  useEffect(() => {
    if (selectedEvent) {
      setStart(selectedEvent.start);
      setEnd(selectedEvent.end);
      setDay(selectedEvent.day);
      setType(selectedEvent.type);
      setName(selectedEvent.name);
      setFacultyId(selectedEvent.faculty);
    }
  }, [selectedEvent]);

  const handleSubmit = async () => {
    const id = await createEvent({
      classroom: selectedClassroom as Id<"classrooms">,
      day,
      end,
      faculty: selectedEvent.faculty,
      name: selectedEvent.name,
      start,
      type: selectedEvent.type,
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

    await deleteEvent({ id: selectedEvent._id });
  };

  const getClassrooms = async () => {
    console.log(start);

    const classrooms = await client.query(
      api.classroom.getAvailableClassrooms,
      {
        day,
        start,
        end,
        type: selectedEvent.type,
      }
    );
    setClassrooms(classrooms);
  };

  useEffect(() => {
    setClassrooms(undefined);
  }, [day, start, end, type]);

  return (
    <Drawer
      direction="right"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Schedule Class</CardTitle>
            <CardDescription>
              Fill out the form to schedule your class.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter class name"
                  value={name}
                  disabled
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="faculty">Faculty</Label>
                <Select
                  value={facultyId}
                  disabled
                  onValueChange={(value: Id<"faculty">) => setFacultyId(value)}
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
                  <Label htmlFor="day">Day</Label>
                  <Select value={day} onValueChange={(value) => setDay(value)}>
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
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={type}
                    disabled
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
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input
                    id="end-time"
                    type="time"
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
  );
}
