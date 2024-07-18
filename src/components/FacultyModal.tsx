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
import { Card, CardContent } from "./ui/card";
import { UserIcon } from "lucide-react";

export default async function FacultyModal() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <UserIcon className="w-10 h-10 mb-2" />
        <h3 className="text-lg font-semibold mb-1">Add Faculty Members</h3>
        <p className="text-muted-foreground text-sm">
          Onboard new faculty members.
        </p>
        <Dialog>
          <DialogTrigger>
            <Button size="sm" className="mt-4">
              Add
            </Button>{" "}
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
      </CardContent>
    </Card>
  );
}
