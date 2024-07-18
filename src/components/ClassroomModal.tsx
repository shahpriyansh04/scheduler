import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { client } from "@/lib/client";
import { PencilIcon } from "lucide-react";
import { api } from "../../convex/_generated/api";
import SubmitButton from "./SubmitButton";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function ClassroomModal() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <PencilIcon className="w-10 h-10 mb-2" />
        <h3 className="text-lg font-semibold mb-1">Create Classrooms</h3>
        <p className="text-muted-foreground text-sm">
          Add new classrooms to the system.
        </p>
        <Dialog>
          <DialogTrigger>
            <Button size="sm" className="mt-4">
              Create
            </Button>{" "}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Classroom</DialogTitle>
            </DialogHeader>
            <form
              action={async function createFaculty(data: FormData) {
                "use server";
                await client.mutation(api.classroom.createClassroom, {
                  name: data.get("name") as string,
                  type: data.get("type") as string,
                });
              }}
              className="grid gap-4"
            >
              <Input id="name" name="name" placeholder="Enter classroom name" />
              <Select name="type">
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lab">Lab</SelectItem>
                  <SelectItem value="cr">CR</SelectItem>
                </SelectContent>
              </Select>
              <SubmitButton />
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
