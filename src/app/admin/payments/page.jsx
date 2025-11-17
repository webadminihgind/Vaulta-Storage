"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/Input";

export default function AdminPayments() {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    fetchPayments();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = payments.filter(
        (payment) =>
          payment.bookings?.users?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.bookings?.users?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPayments(filtered);
    } else {
      setFilteredPayments(payments);
    }
  }, [searchTerm, payments]);

  const fetchPayments = async () => {
    try {
      const response = await fetch("/api/admin/payments");
      const data = await response.json();
      setPayments(data.payments || []);
      setFilteredPayments(data.payments || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "failed":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const totalRevenue = filteredPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Payment History</h1>
        <p className="text-muted-foreground">View all payment transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-primary">
            AED {totalRevenue.toLocaleString()}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Completed Payments</div>
          <div className="text-2xl font-bold text-green-500">
            {filteredPayments.filter((p) => p.status === "completed").length}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Pending Payments</div>
          <div className="text-2xl font-bold text-yellow-500">
            {filteredPayments.filter((p) => p.status === "pending").length}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by customer, transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Transaction ID</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Customer</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Storage Unit</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Amount</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Method</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Status</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-8 text-muted-foreground">
                    No payments found
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-xs">
                        {payment.transaction_id?.slice(0, 16) || "N/A"}...
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{payment.bookings?.users?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {payment.bookings?.users?.email}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">
                        {payment.bookings?.storage_plans?.size || "N/A"}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-lg">
                        AED {parseFloat(payment.amount || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="capitalize text-sm">
                        {payment.payment_method?.replace("_", " ") || "N/A"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Showing {filteredPayments.length} of {payments.length} payments
      </div>
    </div>
  );
}
