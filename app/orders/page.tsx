"use client";

import { useEffect, useState } from "react";
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
  MoreVert,
  Close,
} from "@mui/icons-material";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { Order } from "../data/dummyTypes";

const OrdersPage = () => {
  const accessToken =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  const [orders, setOrders] = useState([]);
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

  useEffect(() => {
    const loadingOrders = toast.loading("Fetching your orders...");
    axios
      .get(`https://vicsmall-backend-ckn4.onrender.com/v1/api/shop/vendor/all-order`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res);
        toast.dismiss(loadingOrders);
        if (res.status === 200) {
          setOrders(res.data.Data);
          toast.success(res.data.Message);
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 400) toast.error(error.response.data.Message);
        else toast.error("An error occurred!");
      })
      .finally(() => toast.dismiss(loadingOrders));
  }, [accessToken]);

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
                <div className="text-2xl font-bold">{orders.length}</div>
                <div className="text-xs opacity-70">ALL ORDERS</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
              <AccessTime className="h-5 w-5" />
              <div>
                <div className="text-2xl font-bold">
                  {
                    orders.filter(
                      (order: Order) =>
                        order.status.toLowerCase() === "pending",
                    ).length
                  }
                </div>
                <div className="text-xs opacity-70">PENDING</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
              <CheckCircleOutline className="h-5 w-5" />
              <div>
                <div className="text-2xl font-bold">
                  {
                    orders.filter(
                      (order: Order) =>
                        order.status.toLowerCase() === "completed",
                    ).length
                  }
                </div>
                <div className="text-[10px] opacity-70 lg:text-xs">COMPLETED</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
              <Close className="h-5 w-5" />
              <div>
                <div className="text-2xl font-bold">
                  {
                    orders.filter(
                      (order: Order) =>
                        order.status.toLowerCase() === "canceled",
                    ).length
                  }
                </div>
                <div className="text-xs opacity-70">PROGRESS</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-white p-6">
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span>ALL ORDERS ({orders.length})</span>
          <span>
            DELIVERED (
            {orders.filter((order: Order) => order.status.toLowerCase() === "completed").length}
            )
          </span>
          <span>
            PICKUP (
            {orders.filter((order: Order) => order.status.toLowerCase() === "pickup").length}
            )
          </span>
          <span>
            CANCELED (
            {orders.filter((order: Order) => order.status.toLowerCase() === "canceled").length}
            )
          </span>
        </div>
        <div className="overflow-x-auto rounded-md border">
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
              {orders.map((order: Order) => (
                <TableRow key={order.order_id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.has(order.order_id)}
                      onCheckedChange={() => handleOrderSelect(order.order_id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`orders/${order.order_id.slice(1, 8)}`}
                      className="hover:underline"
                    >
                      {order.order_id}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
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