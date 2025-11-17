"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, Eye, Download } from "lucide-react";
import { Input } from "@/components/ui/Input";

export default function AdminBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    fetchBookings();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = bookings.filter(
        (booking) =>
          booking.users?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.users?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.storage_plans?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  }, [searchTerm, bookings]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/admin/bookings");
      const data = await response.json();
      setBookings(data.bookings || []);
      setFilteredBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "active":
        return "bg-blue-500/10 text-blue-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

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
        <h1 className="text-3xl font-bold mb-2">Bookings Management</h1>
        <p className="text-muted-foreground">View and manage all warehouse bookings</p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by customer name, email, or booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Booking ID</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Customer</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Storage Unit</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Move-in Date</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Amount</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Status</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Payment</th>
                <th className="text-left p-4 text-sm font-semibold whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-8 text-muted-foreground">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-sm">
                        {booking.id?.slice(0, 8)}...
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{booking.users?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.users?.email}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {booking.users?.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">
                          {booking.storage_plans?.size || booking.storage_plans?.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {booking.storage_plans?.description || booking.storage_plans?.dimensions}
                        </div>
                        {booking.storage_plans?.price_per_month && (
                          <div className="text-xs text-primary font-semibold mt-1">
                            AED {parseFloat(booking.storage_plans.price_per_month).toLocaleString()}/mo
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {booking.start_date ? new Date(booking.start_date).toLocaleDateString() :
                       booking.move_in_date ? new Date(booking.move_in_date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-4">
                      <span className="font-semibold">
                        AED {parseFloat(booking.total_amount || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.payments?.[0]?.status === "completed"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-orange-500/10 text-orange-500"
                      }`}>
                        {booking.payments?.[0]?.status || "pending"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </div>
    </div>
  );
}
