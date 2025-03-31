import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { toast } from "react-toastify";

const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-gray-500" },
  { value: "processing", label: "Processing", color: "bg-blue-500" },
  { value: "confirmed", label: "Confirmed", color: "bg-green-500" },
  { value: "canceled", label: "Canceled", color: "bg-red-500" },
  { value: "delivered", label: "Delivered", color: "bg-purple-500" },
  { value: "shipped", label: "Shipped", color: "bg-yellow-500" },
];

export default function OrderStatusSelect({
  value,
  orderId,
  fetchOrders,
}: any) {
  const handleChange = async (value: string) => {
    try {
      const response = await nhaxinhService.api.orderUpdateOrderStatusCreate({
        orderId,
        status: value,
      });

      if (response.data) {
        toast.success("Update order status successfully");
        fetchOrders();
      } else {
        toast.error("Update order status failed");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            <Badge className={`${status.color} text-white px-2 py-1 rounded`}>
              {status.label}
            </Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
