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

interface Collections {
  collectionId: number;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Collections() {
  const [Collections, setCollections] = useState<Collections[]>([]);
  const fetchCollections = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5217/api/Collections/GetAllCollections"
      );
      console.log("Collections:", response.data);
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };
  useEffect(() => {
    console.log("Collections component mounted");
    fetchCollections();
  }, []);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Materials</CardTitle>
        <CardDescription>Recent Materials from your store.</CardDescription>
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
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Created at</TableHead>
              <TableHead className="text-right">Updated at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Collections.map((collection) => (
              <TableRow key={collection.collectionId}>
                <TableCell>{collection.collectionId}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {collection.name} <Badge variant="secondary">New</Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {collection.description}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {collection.active ? "Active" : "Inactive"}
                </TableCell>
                <TableCell className="text-right">
                  {moment(collection.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  {moment(collection.updatedAt).format("DD-MM-YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
