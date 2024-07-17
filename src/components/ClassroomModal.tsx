import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { client } from "@/lib/client";
import { api } from "../../convex/_generated/api";
import SubmitButton from "./SubmitButton";

export default function ClassroomModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add classroom</Button>
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
  );
}
