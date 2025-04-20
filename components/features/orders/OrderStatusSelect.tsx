"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useState } from "react";
import { nhaxinhService } from "@/util/services/nhaxinhService";

const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-gray-500" },
  { value: "processing", label: "Processing", color: "bg-blue-500" },
  { value: "confirmed", label: "Confirmed", color: "bg-green-500" },
  { value: "canceled", label: "Canceled", color: "bg-red-500" },
  { value: "delivered", label: "Delivered", color: "bg-purple-500" },
  { value: "received", label: "Received", color: "bg-yellow-500" },
];

export default function OrderStatusSelect({
  value,
  orderId,
  fetchOrders,
}: {
  value: string;
  orderId: string;
  fetchOrders: () => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    if (!selectedStatus || reason.trim() === "") {
      toast.error("Please enter a reason");
      return;
    }

    try {
      const response = await nhaxinhService.api.orderUpdateOrderStatusCreate({
        orderId,
        status: selectedStatus,
        reason,
      });

      if (response.data) {
        toast.success("Update order status successfully");
        fetchOrders();
        setOpen(false);
        setReason("");
      } else {
        toast.error("Update order status failed");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <Select
        value={value}
        onValueChange={(val) => {
          setSelectedStatus(val);
          setOpen(true);
        }}
      >
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription>
              Please enter a reason for changing the order status.
            </DialogDescription>
          </DialogHeader>

          <Input
            placeholder="Reason for change"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
