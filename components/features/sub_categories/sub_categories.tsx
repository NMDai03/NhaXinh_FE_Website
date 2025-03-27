"use client";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import axios from "axios";
import AddSubCategoryPopUp from "./add-subcategory";
import UpdateCategoryPopUp from "../categories/update-category";
import UpdateSubCategoryPopUp from "./update-subcategory";

interface SubCategory {
  subCategoryId: number;
  name: string;
  description: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export default function SubCategories() {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5217/api/SubCategory/GetAllCategory"
      );
      console.log("SubCategories:", response.data);
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching SubCategories:", error);
    }
  };
  useEffect(() => {
    console.log("SubCategories component mounted");
    fetchSubCategories();
  }, []);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Sub SubCategories</CardTitle>
        <CardDescription>Recent SubCategories from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddSubCategoryPopUp fetchSubCategories={fetchSubCategories} />
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="hidden sm:table-cell">Name</TableHead>
              <TableHead className="hidden sm:table-cell">
                Description
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                Category Name
              </TableHead>
              <TableHead className="text-right">Created at</TableHead>
              <TableHead className="text-right">Updated at</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subCategories.map((category) => (
              <TableRow key={category.subCategoryId}>
                <TableCell>{category.subCategoryId}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {category.name} <Badge variant="secondary">New</Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {category.description}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {category.categoryName}
                </TableCell>
                <TableCell className="text-right">
                  {moment(category.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  {moment(category.updatedAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  <UpdateSubCategoryPopUp
                    id={category.subCategoryId}
                    fetchSubCategories={fetchSubCategories}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
