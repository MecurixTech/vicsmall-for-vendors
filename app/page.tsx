"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Inventory2Outlined,
  ListAltOutlined,
  LocalAtmOutlined,
  LoopOutlined,
} from "@mui/icons-material";
import { Dashboard as DashboardType } from "./data/dummyTypes";

export default function Dashboard() {
  const token =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  useEffect(() => {
    console.log(token);
    if (!token) {
      redirect("/Sign-in");
    }
  }, [token]);

  const [dashboard, setDashboard] = useState<DashboardType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingDashboard = toast.loading("Loading dashboard details...");
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/vendor-dashboard/`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setDashboard(res.data.Data);
        toast.dismiss(loadingDashboard);
        if (res.status === 200) {
          toast.success(res.data.Message);
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred!");
      })
      .finally(() => {
        setIsLoading(false);
        toast.dismiss(loadingDashboard);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="grid h-[50vh] place-content-center">
        <LoopOutlined fontSize="large" className="animate-spin" />
      </div>
    );
  } else {
    return (
      <>
        <h1 className="mb-4 text-3xl">Dashboard</h1>
        <div className="flex flex-wrap gap-4">
          <Card className="min-w-48 flex-grow p-4">
            <p className="text-3xl font-bold">${dashboard?.total_revenue}</p>
            <hr className="my-2" />
            <h2 className="flex items-center gap-2 text-base font-normal">
              <LocalAtmOutlined />
              <span>Total revenue</span>
            </h2>
          </Card>
          <Card className="min-w-48 flex-grow p-4">
            <p className="text-3xl font-bold">{dashboard?.total_products}</p>
            <hr className="my-2" />
            <h2 className="flex items-center gap-2 text-base font-normal">
              <Inventory2Outlined />
              <span>Total products</span>
            </h2>
          </Card>
          <Card className="min-w-48 flex-grow p-4">
            <p className="text-3xl font-bold">
              {dashboard?.total_product_ordered}
            </p>
            <hr className="my-2" />
            <h2 className="flex items-center gap-2 text-base font-normal">
              <ListAltOutlined />
              <span>Total orders</span>
            </h2>
          </Card>
        </div>
      </>
    );
  }
}
