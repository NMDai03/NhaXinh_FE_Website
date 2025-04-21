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
  const [searchId, setSearchId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 5;

  const fetchOrders = async () => {
    try {
      const response = await nhaxinhService.api.orderGetAllOrderList({
        pageNumber,
        pageSize,
        orderId: searchId,
        status: filterStatus,
      });
      setOrders(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching Orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [pageNumber, searchId, filterStatus]);
  
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, totalPages));
  };
  return (
    <Card>
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent Orders from your store.</CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4 px-2 sm:px-0 items-center">
          <input
            type="text"
            placeholder="Search by Order ID"
            className="border rounded px-3 py-2 w-full sm:w-64"
            value={searchId}
            onChange={(e) => {
              setPageNumber(1);
              setSearchId(e.target.value);
            }}
          />

          <Select
            value={filterStatus}
            onValueChange={(val) => {
              setPageNumber(1);
              setFilterStatus(val);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="received">Received</SelectItem>
            </SelectContent>
          </Select>
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
        <div>
      {/* Your orders list rendering code here */}
      
      {/* Pagination Controls */}
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
            Showing {orders.length} of {totalCount} orders
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
    </div>
      </CardContent>
    </Card>
  );
}
