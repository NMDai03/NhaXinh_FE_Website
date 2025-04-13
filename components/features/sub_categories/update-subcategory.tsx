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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";

const formSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

const UpdateSubCategoryPopUp = ({
  fetchSubCategories,
  id,
}: {
  fetchSubCategories: any;
  id: number;
}) => {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [subCategory, setSubCategory] = React.useState<any>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
      name: "",
      description: "",
    },
  });

  const loadSubCategory = async () => {
    const response = await nhaxinhService.api.subCategoryGetCategoryByIdList({
      id,
    });
    if (response.status == 200) {
      setSubCategory(response.data);
    }
  };

  const loadCategories = async () => {
    const response = await nhaxinhService.api.categoriesGetAllCategoryList();
    if (response.status == 200) {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  useEffect(() => {
    if (subCategory && categories) {
      form.setValue(
        "categoryId",
        categories
          .find((c: any) => c.name == subCategory.categoryName)
          ?.categoryId.toString()
      );
      form.setValue("name", subCategory.name);
      form.setValue("description", subCategory.description);
    }
  }, [subCategory, categories]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await nhaxinhService.api.subCategoryUpdateCategoryUpdate(
        {
          categoryId: parseInt(values.categoryId),
          name: values.name,
          description: values.description,
        },
        {
          id,
        }
      );
      if (response.status == 200) {
        toast.success("Update sub-category successfully");
        fetchSubCategories();
        setOpen(false);
      }
    } catch (error) {
      //   toast.error("Add category failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update category</DialogTitle>
              <DialogDescription>
                {"Fill all the fields. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid py-4 space-y-8">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category: any) => (
                          <SelectItem
                            key={category.categoryId}
                            value={category.categoryId.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

export default UpdateSubCategoryPopUp;
