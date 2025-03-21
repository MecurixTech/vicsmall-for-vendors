"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { MiniChart } from "../app/components/dashboard/mini-chart";
import { CustomBarChart } from "../app/components/dashboard/bar-chart";

export default function Dashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch("https://vicsmall-backend-ckn4.onrender.com/v1/api/dashboard/vendor-dashboard/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Dashboard Data:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch dashboard data");
        }

        setDashboardData(data.Data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Sign-in");
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!dashboardData) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-4">
      <div className="grid gap-4 md:grid-cols-12">
        {/* Daily Sales */}
        <Card className="col-span-12 p-4">
          <h2 className="mb-4 text-2xl font-bold">Daily Sales</h2>
          <div className="mb-10 h-[1px] w-full bg-[#D9D9D9]"></div>
          {dashboardData.daily_sales && dashboardData.daily_sales.length > 0 ? (
            <MiniChart data={dashboardData.daily_sales} />
          ) : (
            <p>No daily sales data available</p>
          )}
        </Card>

        <Card className="col-span-12 p-4">
          <h2 className="mb-4 text-2xl font-bold">Sales by Category</h2>
          <div className="mb-10 h-[1px] w-full bg-[#D9D9D9]"></div>
          {dashboardData.sales_by_category && dashboardData.sales_by_category.length > 0 ? (
            <CustomBarChart data={dashboardData.sales_by_category} />
          ) : (
            <p>No sales by category data available</p>
          )}
        </Card>

        <Card className="col-span-12 p-4">
          <h2 className="mb-4 text-2xl font-bold">Top Products</h2>
          <div className="mb-10 h-[1px] w-full bg-[#D9D9D9]"></div>
          {dashboardData.top_products && dashboardData.top_products.length > 0 ? (
            <CustomBarChart data={dashboardData.top_products} />
          ) : (
            <p>No top products data available</p>
          )}
        </Card>

        <Card className="col-span-12 p-4">
          <h2 className="mb-4 text-2xl font-bold">Total Revenue</h2>
          <div className="mb-10 h-[1px] w-full bg-[#D9D9D9]"></div>
          <p className="text-2xl font-bold">₦{dashboardData.total_revenue}</p>
        </Card>

          <Card className="col-span-12 p-4">
          <h2 className="mb-4 text-2xl font-bold">Total Products</h2>
          <div className="mb-10 h-[1px] w-full bg-[#D9D9D9]"></div>
          <p className="text-2xl font-bold">{dashboardData.total_products}</p>
        </Card>

        <Card className="col-span-12 p-4">
          <h2 className="mb-4 text-2xl font-bold">Total Product Ordered</h2>
          <div className="mb-10 h-[1px] w-full bg-[#D9D9D9]"></div>
          <p className="text-2xl font-bold">{dashboardData.total_product_ordered}</p>
        </Card>
      </div>
    </div>
  );
}