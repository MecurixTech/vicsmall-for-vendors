"use client";

import { Invoice } from "@/app/data/dummyTypes";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const InvoicesPage = () => {
  const accessToken =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const loadingInvoices = toast.loading("Loading invoices...");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/invoice/vendor-invoices`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res);
        toast.dismiss(loadingInvoices);
        if (res.status === 200) {
          setInvoices(res.data.Data);
          toast.success(res.data.Message);
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.Message);
      })
      .then(() => toast.dismiss(loadingInvoices));
  }, []);

  return (
    <>
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">
        Invoices
      </h1>

      {invoices.length === 0 ? (
        <p>No invoices found!</p>
      ) : (
        <div className="w-full overflow-x-scroll">
          <table className="min-w-[768px]">
            <thead>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </thead>
            <tbody>
              {invoices.map((invoice: Invoice) => (
                <tr key={invoice.order_id}>
                  <td>
                    <Link href={`/invoice/${invoice.order_id}`}>
                      {invoice.customer_email}
                    </Link>
                  </td>
                  <td>{invoice.amount}</td>
                  <td>
                    <span
                      className={`${
                        invoice.status.toLowerCase() === "pending"
                          ? "bg-yellow-100 text-yellow-500"
                          : invoice.status.toLowerCase() === "cancelled"
                            ? "bg-red-100 text-red-500"
                            : "bg-green-100 text-green-500"
                      } rounded-xl p-2 text-xs sm:text-sm`}
                    >
                      {invoice.status.toLowerCase()}
                    </span>
                  </td>
                  <td>{new Date(invoice.created_at).toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default InvoicesPage;
