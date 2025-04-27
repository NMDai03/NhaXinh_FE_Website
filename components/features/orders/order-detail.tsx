"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { nhaxinhService } from "@/util/services/nhaxinhService";

interface OrderInfo {
  orderDetailId: number;
  orderId: string;
  productId: number;
  quantity: number;
  price: number;
  productName: string;
  variationColor: string;
  variationImage: string;
}

interface Order {
  orderId: string;
  userId: number;
  totalPrice: number;
  email:string;
  shippingAddress: string;
  deliveryInstructions: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
  orderInfo: OrderInfo[];
  orderStatusHistory: OrderStatusLog[];
}

interface OrderStatusLog {
  changedAt: string; // ISO date string
  email: string;
  orderId: string;
  reason: string;
  status: string;
}

export default function OrderDetailSheet({
  children,
  order,
}: {
  children: React.ReactNode;
  order: Order;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" style={{ overflowY: "auto" }}>
        <SheetTitle>Order: {order.orderId}</SheetTitle>
        <div className="space-y-4">
          <p>
            <strong>Customer:</strong> {order.email}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total Price:</strong> {order.totalPrice} VND
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Order Items</h3>
          <div className="space-y-4 mt-2">
            {order.orderInfo.map((item) => (
              <div
                key={item.orderDetailId}
                className="border p-4 rounded-lg flex items-center gap-4"
              >
                <Image
                  src={item.variationImage}
                  alt={item.productName}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <p>
                    <strong>Product:</strong> {item.productName}
                  </p>
                  <p>
                    <strong>Color:</strong> {item.variationColor}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> {item.price} VND
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {order.orderStatusHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Status History</h3>
            <div className="mt-2 space-y-3">
              {order.orderStatusHistory.map((log, index) => (
                <div
                  key={index}
                  className="text-sm border p-3 rounded-md bg-muted"
                >
                  <p>
                    <strong>Status:</strong> {log.status}
                  </p>
                  <p>
                    <strong>Reason:</strong> {log.reason}
                  </p>
                  <p>
                    <strong>Changed By:</strong> {log.email}
                  </p>
                  <p>
                    <strong>Time:</strong>{" "}
                    {new Date(log.changedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
