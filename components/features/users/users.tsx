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
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { Switch } from "@/components/ui/switch";
import { Button } from "antd";

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

const UserRoleBadge = ({ role }: { role: string }) => {
  switch (role) {
    case "admin":
      return <Badge className="bg-green-200">{role}</Badge>;
    case "employee":
      return <Badge className="bg-yellow-200">{role}</Badge>;
    case "customer":
      return <Badge className="bg-blue-200">{role}</Badge>;
    default:
      return <Badge className="bg-gray-200">{role}</Badge>;
  }
};

export default function Users() {
  const [Users, setUsers] = useState<User[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchEmail, setSearchEmail] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 5;
  const fetchUsers = async () => {
    try {
      const response = await nhaxinhService.api.userGetAllUserPagingList({
        pageNumber,
        pageSize,
        email:searchEmail,
      });
      setUsers(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [pageNumber, searchEmail]);
  const totalPages = Math.ceil(totalCount / pageSize);
  const handlePreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, totalPages));
  };
  // const findByEmail = async () => {
  //   try {
  //     const response = await nhaxinhService.api.userGetUserByEmailList({
  //       email: searchEmail,
  //     });
  //     setUsers([response.data]);
  //   } catch (error) {
  //     console.error("Error fetching order by email:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (searchEmail !== "") {
  //     findByEmail();
  //   } else {
  //     fetchUsers();
  //   }
  // }, [searchEmail]);

  return (
    <Card>
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Users</CardTitle>
          <CardDescription>Recent Users from your store.</CardDescription>
        </div>
        <input
          type="text"
          placeholder="Search by email"
          className="border rounded px-3 py-2 w-full sm:w-64"
          value={searchEmail}
          onChange={(e) => {
            setPageNumber(1);
            setSearchEmail(e.target.value);
          }}
        />
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
                <TableCell className="hidden sm:table-cell uppercase">
                  <UserRoleBadge role={user.role} />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatusSwitch
                    active={user.active}
                    userId={user.userId}
                    fetchUsers={fetchUsers}
                  />
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
        <Button
          onClick={handlePreviousPage}
          disabled={pageNumber === 1}
          className="px-4 py-2"
        >
          Previous
        </Button>
        
        <div className="flex flex-col items-center text-center">
          <span className="text-sm">
            Page {pageNumber} of {totalPages || 1}
          </span>
          <span className="text-xs text-gray-500">
            Showing {Users.length} of {totalCount} users
          </span>
        </div>
        
        <Button
          onClick={handleNextPage}
          disabled={pageNumber >= totalPages}
          className="px-4 py-2"
        >
          Next
        </Button>
      </div>
      </CardContent>
    </Card>
  );
}

const StatusSwitch = ({
  active,
  userId,
  fetchUsers,
}: {
  active: boolean;
  userId: number;
  fetchUsers: () => void;
}) => {
  const [updating, setUpdating] = useState(false);

  const updateUserStatus = async (value: boolean) => {
    try {
      setUpdating(true);
      const response = await nhaxinhService.api.userUpdateUserActiveCreate({
        id: userId,
        active: value,
      });
      if (response.data) {
        toast.success("Update User status successfully");
      } else {
        toast.error("Update User status failed");
      }
    } catch (error) {
      toast.error("Error updating User status");
      setUpdating(false);
      console.error("Error updating User status:", error);
    } finally {
      setUpdating(false);
      fetchUsers();
    }
  };

  return (
    <Switch
      checked={active}
      onCheckedChange={updateUserStatus}
      disabled={updating}
    />
  );
};
