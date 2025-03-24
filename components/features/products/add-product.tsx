"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { toast } from "react-toastify";

interface ProductForm {
  Name: string;
  Description: string;
  Price: string;
  Sold: string;
  CategoryId: string;
  SubCategoryId: string;
  DimensionsLength: string;
  DimensionsWidth: string;
  DimensionsHeight: string;
  MaterialId: string;
  CollectionId: string;
  Weight: string;
  AssemblyRequired: boolean;
  Active: boolean;
  Images?: File[];
}

export default function AddProduct() {
  const [form, setForm] = useState<ProductForm>({
    Name: "",
    Description: "",
    Price: "",
    Sold: "",
    CategoryId: "",
    SubCategoryId: "",
    DimensionsLength: "",
    DimensionsWidth: "",
    DimensionsHeight: "",
    MaterialId: "",
    CollectionId: "",
    Weight: "",
    AssemblyRequired: false,
    Active: true,
    Images: undefined,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [collections, setCollections] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, materialRes, collectionRes] = await Promise.all([
          axios.get("http://localhost:5217/api/Categories/GetAllCategory"),
          axios.get("http://localhost:5217/api/Material/GetAllMaterials"),
          axios.get("http://localhost:5217/api/Collections/GetAllCollections"),
        ]);
        setCategories(categoryRes.data);
        setMaterials(materialRes.data);
        setCollections(collectionRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (form.CategoryId) {
      axios
        .get(
          `http://localhost:5217/api/SubCategory/GetSubCategoryByCategoryId?id=${form.CategoryId}`
        )
        .then((response) => setSubCategories(response.data))
        .catch((error) =>
          console.error("Error fetching subcategories:", error)
        );
    }
  }, [form.CategoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
            ? files
              ? Array.from(files)
              : []
            : value, // Chuyển FileList thành mảng File
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await nhaxinhService.api.productAddProductCreate(
        {
          Name: form.Name,
          Description: form.Description,
          Price: Number(form.Price),
          Sold: Number(form.Sold),
          CategoryId: Number(form.CategoryId),
          SubCategoryId: Number(form.SubCategoryId),
          DimensionsLength: Number(form.DimensionsLength),
          DimensionsWidth: Number(form.DimensionsWidth),
          DimensionsHeight: Number(form.DimensionsHeight),
          MaterialId: Number(form.MaterialId),
          CollectionId: Number(form.CollectionId),
          Weight: Number(form.Weight),
          AssemblyRequired: form.AssemblyRequired,
          Active: form.Active,
          Images: form.Images,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Add product successfully");
        router.push("/products");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-10 p-6 overflow-y-auto max-h-[80vh]">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input name="Name" value={form.Name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              name="Description"
              value={form.Description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input name="Price" value={form.Price} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Sold</Label>
            <Input name="Sold" value={form.Sold} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Dimensions Length</Label>
            <Input
              name="DimensionsLength"
              value={form.DimensionsLength}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Dimensions Width</Label>
            <Input
              name="DimensionsWidth"
              value={form.DimensionsWidth}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Dimensions Height</Label>
            <Input
              name="DimensionsHeight"
              value={form.DimensionsHeight}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Weight</Label>
            <Input name="Weight" value={form.Weight} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              onValueChange={(value) => setForm({ ...form, CategoryId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category: any) => (
                  <SelectItem
                    key={category.categoryId}
                    value={category.categoryId.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Subcategory</Label>
            <Select
              onValueChange={(value) =>
                setForm({ ...form, SubCategoryId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select SubCategory" />
              </SelectTrigger>
              <SelectContent>
                {subCategories.map((subCategory: any) => (
                  <SelectItem
                    key={subCategory.subCategoryId}
                    value={subCategory.subCategoryId.toString()}
                  >
                    {subCategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Material</Label>
            <Select
              onValueChange={(value) => setForm({ ...form, MaterialId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Material" />
              </SelectTrigger>
              <SelectContent>
                {materials.map((material: any) => (
                  <SelectItem
                    key={material.materialId}
                    value={material.materialId.toString()}
                  >
                    {material.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Collection</Label>
            <Select
              onValueChange={(value) =>
                setForm({ ...form, CollectionId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Collection" />
              </SelectTrigger>
              <SelectContent>
                {collections.map((collection: any) => (
                  <SelectItem
                    key={collection.collectionId}
                    value={collection.collectionId.toString()}
                  >
                    {collection.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>3D Model</Label>
            <Input type="file" name="Model3DUrl" onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            <Input type="file" name="Images" onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Assembly Required</Label>
            <Select
              onValueChange={(value) =>
                setForm({ ...form, AssemblyRequired: value === "true" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Active</Label>
            <Select
              onValueChange={(value) =>
                setForm({ ...form, AssemblyRequired: value === "true" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 mt-4">
            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
