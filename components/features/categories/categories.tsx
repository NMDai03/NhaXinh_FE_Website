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
import { Button } from "../../ui/button";
import AddCategoryPopUp from "./add-category";
import { Edit } from "lucide-react";
import UpdateCategoryPopUp from "./update-category";
import { toast } from "react-toastify";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { Switch } from "@/components/ui/switch";

interface Category {
  categoryId: number;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Categories() {
  const [Categories, setCategories] = useState<Category[]>([]);
  const fetchCategories = async () => {
    try {
      const response = await nhaxinhService.api.categoriesGetAllCategoryList();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Categories</CardTitle>
        <CardDescription>Recent Categories from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddCategoryPopUp fetchCategories={fetchCategories} />
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="hidden sm:table-cell">Name</TableHead>
              <TableHead className="hidden sm:table-cell">
                Description
              </TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Created at</TableHead>
              <TableHead className="text-right">Updated at</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Categories.map((category) => (
              <TableRow key={category.categoryId}>
                <TableCell>{category.categoryId}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {category.name}{" "}
                  {moment().diff(moment(category.createdAt)) < 1 && (
                    <Badge variant="secondary">New</Badge>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {category.description}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatusSwitch
                    active={category.active}
                    categoryId={category.categoryId}
                    fetchCategories={fetchCategories}
                  />
                </TableCell>
                <TableCell className="text-right">
                  {moment(category.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  {moment(category.updatedAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  <UpdateCategoryPopUp
                    fetchCategories={fetchCategories}
                    categoryId={category.categoryId}
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

const StatusSwitch = ({
  active,
  categoryId,
  fetchCategories,
}: {
  active: boolean;
  categoryId: number;
  fetchCategories: () => void;
}) => {
  const [updating, setUpdating] = useState(false);

  const updateCategoryStatus = async (value: boolean) => {
    try {
      setUpdating(true);
      const response =
        await nhaxinhService.api.categoriesUpdateCategoryActiveUpdate({
          id: categoryId,
          active: value,
        });
      if (response.data) {
        toast.success("Update category status successfully");
      } else {
        toast.error("Update category status failed");
      }
      setUpdating(false);
      fetchCategories();
    } catch (error) {
      toast.error("Error updating category status");
      setUpdating(false);
      console.error("Error updating category status:", error);
    }
  };

  return (
    <Switch
      checked={active}
      onCheckedChange={updateCategoryStatus}
      disabled={updating}
    />
  );
};
