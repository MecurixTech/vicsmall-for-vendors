"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Package, ShoppingBag, Truck, MapPin, CheckCircle } from "lucide-react"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderStatus {
  step: string
  icon: React.ReactNode
  description: string
  date: string
  completed: boolean
}

export default function OrderSummary() {
  const [discountCode, setDiscountCode] = useState("")

  const orderItems: OrderItem[] = [
    { id: 1, name: "Fancy Bikini", price: 100, quantity: 2, image: "https://s3-alpha-sig.figma.com/img/a290/0ec7/528cc3a077b0fd9d56551b0471f993c6?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J2jYZQuAs~VyxY22QDaNB2HFDkUueG3u2ALPJbV-yuNdMNgiV95QQ1vcbEaoOCw9DSCSr~lxq08pO2szYCK-w8iyRahUNzWaenWRnrasZwr6t4Ib~cl90Jf5ak5SYBT0a6Z95hXA-N4xOX3cCFopVLJDIhAkqZc7vMPSBgFG1r3Tf5pGXrwZBbNoWjCEqsW8AgqFMo0RkJDwftnjEKOGhAaGz-j3ChK9Aa8gTMgZwWpHnIsmussnRXweqDwNKbgszlCERwoNzcU4-uCOh77aZUpor62soB57UGzr7cBLzxkpr0CRdQ5UovvVxzvqkVF1NnZRPpwZ-NGY5WVty2~VLg__" },
    { id: 2, name: "Fancy Bikini", price: 100, quantity: 2, image: "https://s3-alpha-sig.figma.com/img/a290/0ec7/528cc3a077b0fd9d56551b0471f993c6?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J2jYZQuAs~VyxY22QDaNB2HFDkUueG3u2ALPJbV-yuNdMNgiV95QQ1vcbEaoOCw9DSCSr~lxq08pO2szYCK-w8iyRahUNzWaenWRnrasZwr6t4Ib~cl90Jf5ak5SYBT0a6Z95hXA-N4xOX3cCFopVLJDIhAkqZc7vMPSBgFG1r3Tf5pGXrwZBbNoWjCEqsW8AgqFMo0RkJDwftnjEKOGhAaGz-j3ChK9Aa8gTMgZwWpHnIsmussnRXweqDwNKbgszlCERwoNzcU4-uCOh77aZUpor62soB57UGzr7cBLzxkpr0CRdQ5UovvVxzvqkVF1NnZRPpwZ-NGY5WVty2~VLg__" },
    { id: 3, name: "Fancy Bikini", price: 100, quantity: 15, image: "https://s3-alpha-sig.figma.com/img/a290/0ec7/528cc3a077b0fd9d56551b0471f993c6?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J2jYZQuAs~VyxY22QDaNB2HFDkUueG3u2ALPJbV-yuNdMNgiV95QQ1vcbEaoOCw9DSCSr~lxq08pO2szYCK-w8iyRahUNzWaenWRnrasZwr6t4Ib~cl90Jf5ak5SYBT0a6Z95hXA-N4xOX3cCFopVLJDIhAkqZc7vMPSBgFG1r3Tf5pGXrwZBbNoWjCEqsW8AgqFMo0RkJDwftnjEKOGhAaGz-j3ChK9Aa8gTMgZwWpHnIsmussnRXweqDwNKbgszlCERwoNzcU4-uCOh77aZUpor62soB57UGzr7cBLzxkpr0CRdQ5UovvVxzvqkVF1NnZRPpwZ-NGY5WVty2~VLg__" },
    { id: 4, name: "Fancy Bikini", price: 100, quantity: 2, image: "https://s3-alpha-sig.figma.com/img/a290/0ec7/528cc3a077b0fd9d56551b0471f993c6?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J2jYZQuAs~VyxY22QDaNB2HFDkUueG3u2ALPJbV-yuNdMNgiV95QQ1vcbEaoOCw9DSCSr~lxq08pO2szYCK-w8iyRahUNzWaenWRnrasZwr6t4Ib~cl90Jf5ak5SYBT0a6Z95hXA-N4xOX3cCFopVLJDIhAkqZc7vMPSBgFG1r3Tf5pGXrwZBbNoWjCEqsW8AgqFMo0RkJDwftnjEKOGhAaGz-j3ChK9Aa8gTMgZwWpHnIsmussnRXweqDwNKbgszlCERwoNzcU4-uCOh77aZUpor62soB57UGzr7cBLzxkpr0CRdQ5UovvVxzvqkVF1NnZRPpwZ-NGY5WVty2~VLg__" },
    { id: 5, name: "Fancy Bikini", price: 100, quantity: 2, image: "https://s3-alpha-sig.figma.com/img/a290/0ec7/528cc3a077b0fd9d56551b0471f993c6?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J2jYZQuAs~VyxY22QDaNB2HFDkUueG3u2ALPJbV-yuNdMNgiV95QQ1vcbEaoOCw9DSCSr~lxq08pO2szYCK-w8iyRahUNzWaenWRnrasZwr6t4Ib~cl90Jf5ak5SYBT0a6Z95hXA-N4xOX3cCFopVLJDIhAkqZc7vMPSBgFG1r3Tf5pGXrwZBbNoWjCEqsW8AgqFMo0RkJDwftnjEKOGhAaGz-j3ChK9Aa8gTMgZwWpHnIsmussnRXweqDwNKbgszlCERwoNzcU4-uCOh77aZUpor62soB57UGzr7cBLzxkpr0CRdQ5UovvVxzvqkVF1NnZRPpwZ-NGY5WVty2~VLg__" },
    { id: 6, name: "Fancy Bikini", price: 100, quantity: 20, image: "https://s3-alpha-sig.figma.com/img/a290/0ec7/528cc3a077b0fd9d56551b0471f993c6?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J2jYZQuAs~VyxY22QDaNB2HFDkUueG3u2ALPJbV-yuNdMNgiV95QQ1vcbEaoOCw9DSCSr~lxq08pO2szYCK-w8iyRahUNzWaenWRnrasZwr6t4Ib~cl90Jf5ak5SYBT0a6Z95hXA-N4xOX3cCFopVLJDIhAkqZc7vMPSBgFG1r3Tf5pGXrwZBbNoWjCEqsW8AgqFMo0RkJDwftnjEKOGhAaGz-j3ChK9Aa8gTMgZwWpHnIsmussnRXweqDwNKbgszlCERwoNzcU4-uCOh77aZUpor62soB57UGzr7cBLzxkpr0CRdQ5UovvVxzvqkVF1NnZRPpwZ-NGY5WVty2~VLg__" },
  ]

  const orderStatuses: OrderStatus[] = [
    {
      step: "Order Placed",
      icon: <ShoppingBag className="h-6 w-6 text-primary" />,
      description: "An order as been placed",
      date: "09 Dec 2024 15:48",
      completed: true,
    },
    {
      step: "Packed",
      icon: <Package className="h-6 w-6 text-primary" />,
      description: "Picked up by courier partner",
      date: "09 Dec 2024 10:48",
      completed: true,
    },
    {
      step: "Shipped",
      icon: <Truck className="h-6 w-6 text-primary" />,
      description: "ASAP Logistics",
      date: "09 Dec 2024 14:48",
      completed: true,
    },
    {
      step: "Out for Delivery",
      icon: <MapPin className="h-6 w-6 text-muted-foreground" />,
      description: "An order as been placed",
      date: "09 Dec 2024 10:48",
      completed: false,
    },
    {
      step: "Delivered",
      icon: <CheckCircle className="h-6 w-6 text-muted-foreground" />,
      description: "An order as been placed",
      date: "09 Dec 2024 15:48",
      completed: false,
    },
  ]

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const discount = 100
  const shippingCharge = 45
  const tax = 0
  const total = subtotal - discount + shippingCharge + tax

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Order #VICS765</h2>
              <Button className="bg-orange-500 hover:bg-orange-600">Invoice</Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm uppercase text-muted-foreground">
                    <th className="pb-4">Product</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4">Quantity</th>
                    <th className="pb-4 text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 mr-4 object-cover"
                          />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4">${item.price}</td>
                      <td className="py-4">{item.quantity.toString().padStart(2, "0")}</td>
                      <td className="py-4 text-right">${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">NAME:</p>
                  <p>Vera</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">ADDRESS:</p>
                  <p>19th dema street, Dubai</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">PHONE NUMBER:</p>
                  <p>+971 456 444 566</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">EMAIL ADDRESS:</p>
                  <p>vera@email.com</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-medium mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">SUBTOTAL :</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">DISCOUNT :</span>
                <span className="font-medium">${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SHIPPING CHARGE :</span>
                <span className="font-medium">${shippingCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ESTIMATED TAX :</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="text-muted-foreground">TOTAL (USD) :</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex">
              <Input
                placeholder="Enter Discount"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="rounded-r-none"
              />
              <Button className="rounded-l-none bg-orange-500 hover:bg-orange-600">Apply</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-medium mb-2">Order Tracking</h2>
            <p className="text-sm text-muted-foreground mb-6">TRACKING ID: 1DFGDNCBCG</p>

            <div className="relative">
              {orderStatuses.map((status, index) => (
                <div key={index} className="flex mb-8 relative ">
                  <div className="flex-shrink-0 z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${status.completed ? "border-orange-500 bg-orange-50" : "border-muted-foreground bg-muted"}`}
                    >
                      {status.icon}
                    </div>
                  </div>

                  {index < orderStatuses.length - 1 && (
                    <div
                      className={`absolute left-6 top-12 w-0.5 h-16 -ml-px ${orderStatuses[index + 1].completed ? "bg-orange-500" : "bg-muted-foreground"}`}
                    />
                  )}

<div className="ml-4">
                    <h3 className="font-medium text-xs">{status.step}</h3>
                    <p className="text-sm text-muted-foreground">{status.description}</p>
                    <p className="text-sm text-muted-foreground">{status.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

