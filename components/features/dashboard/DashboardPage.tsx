"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { nhaxinhService } from "@/util/services/nhaxinhService";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState<any>();

  const fetchDashboardData = async () => {
    try {
      const response = await nhaxinhService.api.adminGetDashboardList();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const revenueData = [
    { name: "Banking", value: data?.bankingRevenue || 0 },
    { name: "Cash", value: data?.cashRevenue || 0 },
  ];

  const orderStatusData = [
    { name: "Shipped", value: data?.shippedOrder || 0 },
    { name: "Pending", value: data?.pendingOrder || 0 },
    { name: "Processing", value: data?.processingOrder || 0 },
  ];

  const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart width={200} height={200}>
            <Pie
              data={revenueData}
              cx={100}
              cy={100}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {revenueData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart width={200} height={200}>
            <Pie
              data={orderStatusData}
              cx={100}
              cy={100}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {orderStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipped Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data?.shippedOrder || 0}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Most Bought Product</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">
            {data?.mostBuyProduct || "N/A"}
          </p>
        </CardContent>
      </Card>

      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-black">
                  <th className="border p-2">Payment ID</th>
                  <th className="border p-2">Order ID</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data?.payments?.map((payment: any) => (
                  <tr key={payment.PaymentId} className="border">
                    <td className="border p-2">{payment.paymentId}</td>
                    <td className="border p-2">{payment.orderId}</td>
                    <td className="border p-2">{payment.status}</td>
                    <td className="border p-2">
                      {payment.amount?.toLocaleString()} VND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-black">
                  <th className="border p-2">Order ID</th>
                  <th className="border p-2">User ID</th>
                  <th className="border p-2">Total Price</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.orders?.map((order: any, index: number) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{order.orderId}</td>
                    <td className="border p-2">{order.userId}</td>
                    <td className="border p-2">
                      {order.totalPrice?.toLocaleString()} VND
                    </td>
                    <td className="border p-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
