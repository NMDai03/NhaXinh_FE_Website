import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { toast } from "react-toastify";
import { Trash } from "lucide-react";

const DeleteUserPopUp = ({ fetchUsers, id }: { fetchUsers: any; id: any }) => {
  const [open, setOpen] = React.useState(false);

  async function onDelete() {
    try {
      const response = await nhaxinhService.api.userDeleteUserByIdDelete({
        id,
      });
      console.log(response);
      if (response.status == 200) {
        toast.success("Delete user successfully");
        fetchUsers();
        setOpen(false);
      }
    } catch (error) {
      //   toast.error("Add collection failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
        </DialogHeader>
        <div className="py-4">Do you want to delete this user?</div>
        <DialogFooter>
          <Button variant={"destructive"} type="button" onClick={onDelete}>
            Delete user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserPopUp;
