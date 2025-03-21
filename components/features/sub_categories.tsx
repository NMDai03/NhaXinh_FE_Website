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

interface SubCategory {
  subCategoryId: number;
  name: string;
  description: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export default function Categories() {
  const [Categories, setCategories] = useState<SubCategory[]>([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5217/api/SubCategory/GetAllCategory"
      );
      console.log("Categories:", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    console.log("Categories component mounted");
    fetchCategories();
  }, []);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Sub Categories</CardTitle>
        <CardDescription>Recent Categories from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {Categories.map((category) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
