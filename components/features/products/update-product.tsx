"use client";
import { useRouter, useSearchParams } from "next/navigation";
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
import { useEffect } from "react";
import { useState } from "react";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { toast } from "react-toastify";

interface ProductForm {
  name: string;
  description: string;
  price: string;
  sold: string;
  categoryId: string;
  subCategoryId: string;
  dimensionsLength: string;
  dimensionsWidth: string;
  dimensionsHeight: string;
  materialId: string;
  collectionId: string;
  weight: string;
  assemblyRequired: boolean;
  active: boolean;
  images?: File[];
  categoryName?: string;
  subCategoryName?: string;
  materialName?: string;
  collectionName?: string;
  model3DUrl?: File;
}

interface Category {
  categoryId: number;
  name: string;
}

interface SubCategory {
  subCategoryId: number;
  name: string;
}

interface Material {
  materialId: number;
  name: string;
}

interface Collection {
  collectionId: number;
  name: string;
}

export default function UpdateProduct({ productId }: { productId: number }) {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    sold: "",
    categoryId: "",
    subCategoryId: "",
    dimensionsLength: "",
    dimensionsWidth: "",
    dimensionsHeight: "",
    materialId: "",
    collectionId: "",
    weight: "",
    assemblyRequired: false,
    active: true,
    images: undefined,
    model3DUrl: undefined,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (productId) {
      nhaxinhService.api
        .productGetProductByIdDetail(productId)
        .then((res) => setForm(res.data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId]);

  useEffect(() => {
    if (form.categoryName) {
      const categoryId = categories.find(
        (category: any) => category.name === form.categoryName
      )?.categoryId;

      axios
        .get(
          `https://nhaxinhbackend20250408210605.azurewebsites.net/api/SubCategory/GetSubCategoryByCategoryId?id=${categoryId}`
        )
        .then((res) => setSubCategories(res.data))
        .catch((error) =>
          console.error("Error fetching subcategories:", error)
        );
    }
  }, [form.categoryName, categories]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, materialRes, collectionRes] = await Promise.all([
          nhaxinhService.api.categoriesGetAllCategoryList(),
          nhaxinhService.api.materialGetAllMaterialsList(),
          nhaxinhService.api.collectionsGetAllCollectionsList(),
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
    if (form.subCategoryName) {
      const subCategoryId = subCategories.find(
        (subCategory: any) => subCategory.name === form.subCategoryName
      )?.subCategoryId;

      const categoryId = categories.find(
        (category: any) => category.name === form.categoryName
      )?.categoryId;

      const materialId = materials.find(
        (material: any) => material.name === form.materialName
      )?.materialId;

      const collectionId = collections.find(
        (collection: any) => collection.name === form.collectionName
      )?.collectionId;

      setForm((prevForm) => ({
        ...prevForm,
        subCategoryId: subCategoryId?.toString() || "",
        categoryId: categoryId?.toString() || "",
        materialId: materialId?.toString() || "",
        collectionId: collectionId?.toString() || "",
      }));
    }
  }, [
    form.subCategoryName,
    subCategories,
    form.categoryName,
    materials,
    collections,
    form.materialName,
    form.collectionName,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prevForm: any) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : files ? Array.from(files) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((file) => formData.append(key, file));
          } else {
            formData.append(key, value as string | Blob);
          }
        }
      });

      await nhaxinhService.api.productUpdateProductUpdate(
        {
          Active: form.active,
          AssemblyRequired: form.assemblyRequired,
          CollectionId: Number(form.collectionId),
          CategoryId: Number(form.categoryId),
          DimensionsHeight: Number(form.dimensionsHeight),
          DimensionsLength: Number(form.dimensionsLength),
          DimensionsWidth: Number(form.dimensionsWidth),
          Description: form.description,
          MaterialId: Number(form.materialId),
          Name: form.name,
          Price: Number(form.price),
          SubCategoryId: Number(form.subCategoryId),
          Weight: Number(form.weight),
          Images: form.images,
          Model3DUrl: form.model3DUrl,
        },
        {
          id: productId,
        }
      );

      toast.success("Product updated successfully!");
      router.push("/products");
    } catch (error: any) {
      toast.error(
        error?.response.data.errors.Images
          ? error?.response.data.errors.Images[0]
          : "Error adding product"
      );
      console.error("Error updating product:", error);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-10 p-6 overflow-y-auto max-h-[80vh]">
      <CardHeader>
        <CardTitle>Update Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>description</Label>
            <Input
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>price</Label>
            <Input name="price" value={form.price} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>sold</Label>
            <Input name="sold" value={form.sold} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>dimensions length</Label>
            <Input
              name="dimensionsLength"
              value={form.dimensionsLength}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>dimensions width</Label>
            <Input
              name="dimensionsWidth"
              value={form.dimensionsWidth}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>dimensions height</Label>
            <Input
              name="dimensionsHeight"
              value={form.dimensionsHeight}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>weight</Label>
            <Input name="weight" value={form.weight} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>category</Label>
            <Select
              value={form.categoryId?.toString()}
              onValueChange={(value) => setForm({ ...form, categoryId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
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
            <Label>subcategory</Label>
            <Select
              value={form.subCategoryId?.toString()}
              onValueChange={(value) =>
                setForm({ ...form, subCategoryId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subcategory" />
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
            <Label>material</Label>
            <Select
              value={form.materialId?.toString()}
              onValueChange={(value) => setForm({ ...form, materialId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select material" />
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
            <Label>collection</Label>
            <Select
              value={form.collectionId?.toString()}
              onValueChange={(value) =>
                setForm({ ...form, collectionId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select collection" />
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
            <Label>3D model</Label>
            <Input type="file" name="model3DUrl" onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>image</Label>
            <Input type="file" name="images" onChange={handleChange} multiple />
          </div>
          <div className="space-y-2">
            <Label>assembly required</Label>
            <Select
              value={form.assemblyRequired ? "true" : "false"}
              onValueChange={(value) =>
                setForm({ ...form, assemblyRequired: value === "true" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>active</Label>
            <Select
              value={form.active ? "true" : "false"}
              onValueChange={(value) =>
                setForm({ ...form, active: value === "true" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 mt-4">
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
