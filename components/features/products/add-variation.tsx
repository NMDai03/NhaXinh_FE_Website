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
import { Input } from "@/components/ui/input";
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
import { Cross } from "lucide-react";

// ✅ Schema với zod (validate file upload)
const formSchema = z.object({
  color: z.string().min(2, {
    message: "Color must be at least 2 characters.",
  }),
  imgUrl: z.custom<File>((val) => val instanceof File && val.size > 0, {
    message: "Please upload an image.",
  }),
});

const AddVariationPopUp = ({
  fetchProductDetail,
  productId,
}: {
  fetchProductDetail: any;
  productId: number;
}) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: "",
      imgUrl: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response =
        await nhaxinhService.api.productVariationAddProductVariationCreate({
          ProductId: productId,
          Color: values.color,
          ImageUrl: values.imgUrl, // <-- File object
        });

      if (response.status == 201) {
        toast.success("Add variation successfully");
        fetchProductDetail();
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      toast.error("Add variation failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Cross />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add new variant</DialogTitle>
              <DialogDescription>
                {"Fill all the fields. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid py-4 space-y-8">
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imgUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file); // cập nhật File object
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add new variation</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVariationPopUp;
