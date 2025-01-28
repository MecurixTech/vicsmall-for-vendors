"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {Assignment, AccessTime, CheckCircleOutline, Refresh, MoreVert} from '@mui/icons-material';

type OrderStatus = "pending" | "completed" | "canceled"

interface Order {
  id: string
  customerName: string
  amount: number
  status: OrderStatus
}

const stats = {
  allOrders: 7000,
  pending: 200,
  completed: 1000,
  inProgress: 250,
}


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
]

const Home = () => {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())

  const handleOrderSelect = (orderId: string) => {
    const newSelected = new Set(selectedOrders)
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId)
    } else {
      newSelected.add(orderId)
    }
    setSelectedOrders(newSelected)
  }
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
                <TrendingUpIcon sx={{ color: 'green' }} fontSize="small" />
                  <span className="text-xs font-normal text-green-500"> 12%</span>
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
     
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <Card className="bg-[#040458] text-white">
        <CardContent className="p-6 ">
          <h2 className="text-lg font-semibold mb-4 text-white">ORDER STATUS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
              <Assignment className="h-5 w-5" />
              <div>
                <div className="text-2xl font-bold">{stats.allOrders}</div>
                <div className="text-xs opacity-70">ALL ORDERS</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
              <AccessTime className="h-5 w-5" />
              <div>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <div className="text-xs opacity-70">PENDING</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
              <CheckCircleOutline className="h-5 w-5" />
              <div>
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-xs opacity-70">COMPLETED</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
              <Refresh className="h-5 w-5" />
              <div>
                <div className="text-2xl font-bold">{stats.inProgress}</div>
                <div className="text-xs opacity-70">PROGRESS</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
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
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>${order.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === "pending"
                          ? "bg-purple-100 text-purple-700"
                          : order.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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
    
    </>
  );
};

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
           <Brand/>
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
