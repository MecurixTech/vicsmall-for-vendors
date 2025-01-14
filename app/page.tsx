import { Card } from "@/components/ui/card";
import { Leaderboard } from "../app/components/dashboard/leaderboard";
import { Component as Danny } from "../app/components/dashboard/danny";
import { Component as ChartTwo } from "../app/components/dashboard/chart-two";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="p-4">
      <div className="grid gap-4 md:grid-cols-12">
        {/* First Row - Net Sales (Spans 8 columns) */}
        <Card className="col-span-6 p-4">
          <h2 className="mb-4 text-2xl font-semibold">User Statistics</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Daily Sales</p>
                <p className="text-2xl font-bold">$910</p>
                <p className="text-sm text-red-500">↓ 15%</p>
              </div>
              <h1 className="self-center">hello</h1>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Product</p>
              <p className="text-2xl font-bold">$2621</p>
              <p className="text-sm text-green-500">↑ 8%</p>
            </div>
          </div>
        </Card>

        {/* First Row - User Statistics (Spans 4 columns) */}
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

        {/* Second Row - Sales Statistics (Spans 8 columns) */}
        <Card className="col-span-6 p-4">
          <h2 className="mb-4 text-lg font-semibold">Sales Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Daily Sales</p>
              <p className="text-2xl font-bold">$910</p>
              <p className="text-sm text-red-500">↓ 15%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Product</p>
              <p className="text-2xl font-bold">$2621</p>
              <p className="text-sm text-green-500">↑ 8%</p>
            </div>
          </div>
        </Card>

        {/* Second Row - Brand Category (Spans 4 columns) */}
        <Card className="col-span-6 p-4">
          <ChartTwo />
        </Card>

        {/* Third Row - Leaderboard (Spans 8 columns) */}
        <Card className="col-span-6">
          <Leaderboard />
        </Card>

        {/* Third Row - Sales Category and Trending Now (Spans 4 columns) */}
        <div className="col-span-6 grid grid-rows-1 gap-4">
          <Card className="p-4">
            <ChartTwo />
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
