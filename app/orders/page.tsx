"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Assignment,
  AccessTime,
  CheckCircleOutline,
  Refresh,
  MoreVert,
} from "@mui/icons-material";
import Link from "next/link";

type OrderStatus = "pending" | "completed" | "canceled";

interface Order {
  id: string;
  customerName: string;
  amount: number;
  status: OrderStatus;
}

const stats = {
  allOrders: 7000,
  pending: 200,
  completed: 1000,
  inProgress: 250,
};

const orders: Order[] = [
  { id: "#VICS765", customerName: "VERA", amount: 100, status: "pending" },
  { id: "#VICS545", customerName: "SUSAN", amount: 10, status: "completed" },
  { id: "#VICS543", customerName: "DAVE", amount: 100, status: "canceled" },
  { id: "#VICS765", customerName: "FRED", amount: 10, status: "pending" },
  { id: "#VICS545", customerName: "CHIKE", amount: 100, status: "completed" },
  { id: "#VICS543", customerName: "DOM", amount: 10, status: "canceled" },
  { id: "#VICS765", customerName: "VIN", amount: 100, status: "pending" },
  { id: "#VICS545", customerName: "STAR", amount: 10, status: "completed" },
  { id: "#VICS543", customerName: "TREM", amount: 100, status: "canceled" },
  { id: "#VICS765", customerName: "STEPH", amount: 10, status: "pending" },
  { id: "#VICS545", customerName: "NKEM", amount: 100, status: "completed" },
  { id: "#VICS543", customerName: "ANDY", amount: 10, status: "canceled" },
];

const OrdersPage = () => {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());

  const handleOrderSelect = (orderId: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <Card className="bg-[#040458] text-white">
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            ORDER STATUS
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
              <Assignment className="h-5 w-5" />
              <div>
                <div className="text-2xl font-bold">{stats.allOrders}</div>
                <div className="text-xs opacity-70">ALL ORDERS</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
              <AccessTime className="h-5 w-5" />
              <div>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <div className="text-xs opacity-70">PENDING</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
              <CheckCircleOutline className="h-5 w-5" />
              <div>
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-xs opacity-70">COMPLETED</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
              <Refresh className="h-5 w-5" />
              <div>
                <div className="text-2xl font-bold">{stats.inProgress}</div>
                <div className="text-xs opacity-70">PROGRESS</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-white p-6">
        <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
          <span>ALL ORDERS (250)</span>
          <span>DELIVERED (120)</span>
          <span>PICKUP (80)</span>
          <span>CANCELED (34)</span>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>ORDER ID</TableHead>
                <TableHead>CUSTOMER NAME</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.has(order.id)}
                      onCheckedChange={() => handleOrderSelect(order.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`orders/${order.id.slice(1, 8)}`}
                      className="hover:underline"
                    >
                      {order.id}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>${order.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        order.status === "pending"
                          ? "bg-purple-100 text-purple-700"
                          : order.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVert className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
