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
import AddMaterialPopUp from "./add-material";
import UpdateMaterialPopUp from "./update-material";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { toast } from "react-toastify";
import { Switch } from "@/components/ui/switch";

interface Materials {
  materialId: number;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Materials() {
  const [Materials, setMaterials] = useState<Materials[]>([]);
  const fetchMaterials = async () => {
    try {
      const response = await nhaxinhService.api.materialGetAllMaterialsList();
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };
  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Materials</CardTitle>
        <CardDescription>Recent Materials from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddMaterialPopUp fetchMaterials={fetchMaterials} />
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
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Materials.map((material) => (
              <TableRow key={material.materialId}>
                <TableCell>{material.materialId}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {material.name}{" "}
                  {moment().diff(moment(material.createdAt)) < 3 && (
                    <Badge variant="secondary">New</Badge>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {material.description}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatusSwitch
                    active={material.active}
                    materialId={material.materialId}
                    fetchMaterials={fetchMaterials}
                  />
                </TableCell>
                <TableCell className="text-right">
                  {moment(material.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  {moment(material.updatedAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  <UpdateMaterialPopUp
                    materialId={material.materialId}
                    fetchMaterials={fetchMaterials}
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
  materialId,
  fetchMaterials,
}: {
  active: boolean;
  materialId: number;
  fetchMaterials: () => void;
}) => {
  const [updating, setUpdating] = useState(false);

  const updateMaterialStatus = async (value: boolean) => {
    try {
      setUpdating(true);
      const response =
        await nhaxinhService.api.materialUpdateMaterialActiveUpdate({
          id: materialId,
          active: value,
        });
      if (response.data) {
        toast.success("Update Material status successfully");
      } else {
        toast.error("Update Material status failed");
      }
      setUpdating(false);
      fetchMaterials();
    } catch (error) {
      toast.error("Error updating Material status");
      setUpdating(false);
      console.error("Error updating Material status:", error);
    }
  };

  return (
    <Switch
      checked={active}
      onCheckedChange={updateMaterialStatus}
      disabled={updating}
    />
  );
};
