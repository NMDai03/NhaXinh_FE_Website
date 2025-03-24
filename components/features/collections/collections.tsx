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
import UpdateCollectionPopUp from "./update-collection";
import AddCollectionPopUp from "./add-collection";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { toast } from "react-toastify";
import { Switch } from "@/components/ui/switch";

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
        <CardTitle>Collections</CardTitle>
        <CardDescription>Recent Collections from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddCollectionPopUp fetchCollections={fetchCollections} />
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
            {Collections.map((collection) => (
              <TableRow key={collection.collectionId}>
                <TableCell>{collection.collectionId}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {collection.name}{" "}
                  {moment().diff(moment(collection.createdAt)) < 3 && (
                    <Badge variant="secondary">New</Badge>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {collection.description}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatusSwitch
                    active={collection.active}
                    fetchCollections={fetchCollections}
                    collectionId={collection.collectionId}
                  />
                </TableCell>
                <TableCell className="text-right">
                  {moment(collection.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  {moment(collection.updatedAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  <UpdateCollectionPopUp
                    collectionId={collection.collectionId}
                    fetchcollections={fetchCollections}
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
  collectionId,
  fetchCollections,
}: {
  active: boolean;
  collectionId: number;
  fetchCollections: () => void;
}) => {
  const [updating, setUpdating] = useState(false);

  const updateProductStatus = async (value: boolean) => {
    try {
      setUpdating(true);
      const response =
        await nhaxinhService.api.collectionsUpdateCollectionActiveUpdate({
          id: collectionId,
          active: value,
        });
      toast.success(response.data);
      setUpdating(false);
      fetchCollections();
      console.log("Product status updated:", response.data);
    } catch (error) {
      toast.error("Error updating product status");
      setUpdating(false);
      console.error("Error updating product status:", error);
    }
  };

  return (
    <Switch
      checked={active}
      onCheckedChange={updateProductStatus}
      disabled={updating}
    />
  );
};
