"use client";
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
import { nhaxinhService } from "@/util/services/nhaxinhService";
import AssignRolePopUp from "./assign-role";
import DeleteUserPopUp from "./delete-user";

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  role: string;
  active: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function Users() {
  const [Users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    try {
      const response = await nhaxinhService.api.userGetAllUserList();
      setUsers(response.data);
      console.log("Users:", response.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };
  useEffect(() => {
    console.log("Users component mounted");
    fetchUsers();
  }, []);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Users</CardTitle>
        <CardDescription>Recent Users from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="hidden sm:table-cell">Name</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden sm:table-cell">Role</TableHead>
              <TableHead className="hidden sm:table-cell">Active</TableHead>
              <TableHead className="text-right">Created at</TableHead>
              <TableHead className="text-right">Updated at</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {user.firstName + " " + user.lastName}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {user.email}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {user.role}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {user.active ? "Active" : "Inactive"}
                </TableCell>
                <TableCell className="text-right">
                  {moment(user.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  {moment(user.updatedAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className="flex gap-2">
                  <AssignRolePopUp
                    id={user.userId}
                    fetchUsers={fetchUsers}
                    role={user.role}
                  />
                  <DeleteUserPopUp id={user.userId} fetchUsers={fetchUsers} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
