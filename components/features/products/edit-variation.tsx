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

// ✅ Schema với zod
const formSchema = z.object({
  color: z.string().min(2, {
    message: "Color must be at least 2 characters.",
  }),
  imgUrl: z
    .custom<File>((val) => val instanceof File && val.size > 0, {
      message: "Please upload an image.",
    })
    .optional(),
});

const EditVariationPopUp = ({
  fetchProductDetail,
  productId,
  children,
  variation,
}: {
  fetchProductDetail: any;
  productId: number;
  children: React.ReactNode;
  variation: { variationId: number; color: string; imageUrl: string };
}) => {
  const [open, setOpen] = React.useState(false);
  const [imgPreview, setImgPreview] = React.useState<string>(
    variation.imageUrl
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: variation.color,
      imgUrl: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response =
        await nhaxinhService.api.productVariationUpdateProductVariationCreate(
          {
            ProductId: productId,
            Color: values.color,
            ImageUrl: values.imgUrl, // File object
          },
          {
            id: variation.variationId,
          }
        );

      if (response.status == 200) {
        toast.success("Edit variation successfully");
        fetchProductDetail();
        setOpen(false);
      }
    } catch (error) {
      toast.error("Edit variation failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit variant</DialogTitle>
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
                    {/* ✅ Hiển thị ảnh cũ */}
                    {imgPreview && (
                      <img
                        src={imgPreview}
                        alt="Current"
                        className="w-full h-40 object-contain border rounded mb-2"
                      />
                    )}
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImgPreview(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
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

export default EditVariationPopUp;
