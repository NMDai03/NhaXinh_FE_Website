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

import { nhaxinhService } from "@/util/services/nhaxinhService";

interface Payment {
  paymentId: number;
  orderId: string;
  status: string;
  amount: number;
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const fetchPayments = async () => {
    try {
      const response = await nhaxinhService.api.paymentGetAllPaymentsList();
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };
  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Payments</CardTitle>
        <CardDescription>Recent Payments from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="hidden sm:table-cell">Order Id</TableHead>
              <TableHead className="hidden sm:table-cell">Amount</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.paymentId}>
                <TableCell>{payment.orderId}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {payment.amount}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {payment.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
