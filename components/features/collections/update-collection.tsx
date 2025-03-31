import React, { useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { toast } from "react-toastify";
import { Edit } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

const UpdateCollectionPopUp = ({
  fetchcollections,
  collectionId,
}: {
  fetchcollections: any;
  collectionId: number;
}) => {
  const [collection, setcollection] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    nhaxinhService.api
      .collectionsGetCollectionByIdDetail(collectionId)
      .then((res) => {
        setcollection(res.data);
        form.setValue("name", res.data.name);
        form.setValue("description", res.data.description);
      });
  }, [collectionId, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response =
        await nhaxinhService.api.collectionsUpdateCollectionUpdate(
          collectionId,
          {
            name: values.name,
            description: values.description,
          }
        );
      if (response.status == 200) {
        toast.success("Update collection successfully");
        fetchcollections();
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      //   toast.error("Add collection failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Edit size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update collection</DialogTitle>
              <DialogDescription>
                {"Fill all the fields. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid py-4 space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCollectionPopUp;
