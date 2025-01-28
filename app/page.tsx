import { Card } from "@/components/ui/card";
import { Leaderboard } from "../app/components/dashboard/leaderboard";
import { Component as Danny } from "../app/components/dashboard/danny";
import { Component as ChartTwo } from "../app/components/dashboard/chart-two";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Image from "next/image";
import { MiniChart } from "../app/components/dashboard/mini-chart";
import { Brand } from "./components/dashboard/brand";

export default function Dashboard() {
  return (
    <div className="p-4">
      <div className="grid gap-4 md:grid-cols-12">
        {/* First Row - Net Sales (Spans 8 columns) */}
        <Card className="col-span-6 p-4">
          <h2 className="mb-4 text-2xl font-bold">User Statistics</h2>
          <div className="mb-10 h-[1px] w-full bg-[#D9D9D9]"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2">
              <div>
                <p className="text-base font-normal text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">$11,210</p>
                <div>
                  <TrendingDownIcon color="error" fontSize="small" />
                  <span className="text-xs font-normal text-red-500"> 12%</span>
                </div>
              </div>
              <MiniChart />
            </div>
            {/* <div className="w-[1px] h-full bg-black "></div> */}
            <div className="flex gap-2">
              <div>
                <p className="text-base font-normal text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">$11,210</p>
                <div>
                  <TrendingUpIcon sx={{ color: "green" }} fontSize="small" />
                  <span className="text-xs font-normal text-green-500">
                    {" "}
                    12%
                  </span>
                </div>
              </div>
              <MiniChart />
            </div>
          </div>
        </Card>

        {/* First Row - User Statistics (Spans 6 columns) */}
        <Card className="col-span-6 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Net Sales</h2>
            <select className="rounded-md border px-2 py-1 text-sm">
              <option>Week</option>
              <option>Month</option>
              <option>Year</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Danny />
          </div>
        </Card>

        {/* Second Row - Sales Statistics (Spans 6 columns) */}
        <Card className="col-span-6 p-4">
          <h2 className="mb-4 text-2xl font-bold">Sales Statistics</h2>
          <div className="mb-10 h-[1px] w-full bg-[#D9D9D9]"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2">
              <div>
                <p className="text-base font-normal text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">$11,210</p>
                <div>
                  <TrendingDownIcon color="error" fontSize="small" />
                  <span className="text-xs font-normal text-red-500"> 12%</span>
                </div>
              </div>
              <MiniChart />
            </div>
            {/* <div className="w-[1px] h-full bg-black "></div> */}
            <div className="flex gap-2">
              <div>
                <p className="text-base font-normal text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">$11,210</p>
                <div>
                  <TrendingDownIcon color="error" fontSize="small" />
                  <span className="text-xs font-normal text-red-500"> 12%</span>
                </div>
              </div>
              <MiniChart />
            </div>
          </div>
        </Card>
        {/* Second Row - Brand Category (Spans 6 columns) */}
        <Card className="col-span-6 p-4">
          <ChartTwo />
        </Card>

        {/* Third Row - Leaderboard (Spans 6 columns) */}
        <Card className="col-span-6">
          <Leaderboard />
        </Card>

        {/* Third Row - Sales Category and Trending Now (Spans 4 columns) */}
        <div className="col-span-6 grid grid-rows-1 gap-4">
          <Card className="p-4">
            <Brand />
          </Card>

          <Card className="">
            <div className="relative">
              <img
                src="/jacket.jpeg"
                alt="Wooly Jacket"
                className="h-40 w-full rounded-lg object-cover shadow-sm"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                <h2 className="text-lg font-semibold text-white">
                  Trending now
                </h2>
                <div>
                  <p className="font-semibold">Wooly Jacket</p>
                  <p className="font-semibold">$144.99</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
