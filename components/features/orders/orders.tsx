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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Order } from "@/util/services/Api";
import { Switch } from "../../ui/switch";
import { toast } from "react-toastify";
import { Coins, CreditCard, Edit, Eye } from "lucide-react";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderStatusSelect from "./OrderStatusSelect";
import OrderDetailSheet from "./order-detail";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 5;
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      const response = await nhaxinhService.api.orderGetAllOrderList();
      console.log("Orders:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching Orders:", error);
    }
  };

  useEffect(() => {
    console.log("Orders component mounted");
    fetchOrders();
  }, [pageNumber]);

  return (
    <Card>
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent Orders from your store.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="hidden sm:table-cell">
                Total Price
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                Shipping Address
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                Payment Method
              </TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Created at</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order: any) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {order.totalPrice}{" "}
                  {moment().diff(moment(order.createdAt), "days") < 3 && (
                    <Badge variant="secondary">New</Badge>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {order.shippingAddress}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {order.paymentMethod == "cash" ? (
                    <Badge className="bg-yellow-200">
                      <Coins className="mr-2" size={16} /> Cash
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-200">
                      <CreditCard className="mr-2" size={16} /> Banking
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <OrderStatusSelect
                    value={order.status}
                    orderId={order.orderId}
                    fetchOrders={fetchOrders}
                  />
                </TableCell>
                <TableCell className="text-right">
                  {moment(order.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  <OrderDetailSheet order={order}>
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                  </OrderDetailSheet>
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
  status,
  orderId,
  fetchOrders,
}: {
  status: string;
  orderId: string;
  fetchOrders: () => void;
}) => {
  const [updating, setUpdating] = useState(false);

  const updateOrderstatus = async (value: boolean) => {
    try {
      setUpdating(true);
      const response = await axios.patch(
        `http://localhost:5217/api/Product/UpdateProductActive/${orderId}`,
        value,
        {
          headers: {
            "Content-Type": "application/json", // 🔹 Đảm bảo gửi đúng format JSON
          },
        }
      );
      toast.success(response.data.message);
      setUpdating(false);
      fetchOrders();
      console.log("Product status updated:", response.data);
    } catch (error) {
      toast.error("Error updating product status");
      setUpdating(false);
      console.error("Error updating product status:", error);
    }
  };

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light"></SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};
