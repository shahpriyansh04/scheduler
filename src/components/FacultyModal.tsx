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
import { ConvexClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { client } from "@/lib/client";
import SubmitButton from "./SubmitButton";

export default async function FacultyModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add faculty</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add faculty</DialogTitle>
        </DialogHeader>
        <form
          action={async function createFaculty(data: FormData) {
            "use server";
            await client.mutation(api.faculty.createFaculty, {
              name: data.get("name") as string,
            });
            data.delete("name");
          }}
        >
          <Input id="name" name="name" placeholder="Enter faculty name" />
          <SubmitButton />
        </form>
        {/* <Input id="initials" placeholder="Enter faculty initials" /> */}
      </DialogContent>
    </Dialog>
  );
}
