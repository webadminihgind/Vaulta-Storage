"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Users, CreditCard, Warehouse, TrendingUp, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    activeStorageUnits: 0,
    pendingBookings: 0,
    completedPayments: 0,
  });

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [bookingsRes, usersRes, paymentsRes, storageRes] = await Promise.all([
        fetch("/api/admin/bookings"),
        fetch("/api/admin/users"),
        fetch("/api/admin/payments"),
        fetch("/api/admin/storage-options"),
      ]);

      const bookingsData = await bookingsRes.json();
      const usersData = await usersRes.json();
      const paymentsData = await paymentsRes.json();
      const storageData = await storageRes.json();

      const completedPayments = paymentsData.payments?.filter(
        (p) => p.status === "completed"
      ) || [];
      const totalRevenue = completedPayments.reduce(
        (sum, p) => sum + (parseFloat(p.amount) || 0),
        0
      );

      setStats({
        totalBookings: bookingsData.bookings?.length || 0,
        totalUsers: usersData.users?.length || 0,
        totalRevenue: totalRevenue,
        activeStorageUnits: storageData.storageOptions?.filter(o => o.is_active)?.length || 0,
        pendingBookings: bookingsData.bookings?.filter(b => b.status === "pending")?.length || 0,
        completedPayments: completedPayments.length,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Total Revenue",
      value: `AED ${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Active Storage Units",
      value: stats.activeStorageUnits,
      icon: Warehouse,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: Package,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      title: "Completed Payments",
      value: stats.completedPayments,
      icon: CreditCard,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your warehouse management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => {
                setNavigating("bookings");
                router.push("/admin/bookings");
              }}
              disabled={navigating === "bookings"}
              className="w-full text-left px-4 py-3 rounded-md bg-muted hover:bg-muted/80 transition-colors disabled:opacity-50 flex items-center justify-between"
            >
              <span>View All Bookings</span>
              {navigating === "bookings" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>→</span>
              )}
            </button>
            <button
              onClick={() => {
                setNavigating("users");
                router.push("/admin/users");
              }}
              disabled={navigating === "users"}
              className="w-full text-left px-4 py-3 rounded-md bg-muted hover:bg-muted/80 transition-colors disabled:opacity-50 flex items-center justify-between"
            >
              <span>Manage Users</span>
              {navigating === "users" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>→</span>
              )}
            </button>
            <button
              onClick={() => {
                setNavigating("storage");
                router.push("/admin/storage-options");
              }}
              disabled={navigating === "storage"}
              className="w-full text-left px-4 py-3 rounded-md bg-muted hover:bg-muted/80 transition-colors disabled:opacity-50 flex items-center justify-between"
            >
              <span>Manage Storage Options</span>
              {navigating === "storage" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>→</span>
              )}
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database</span>
              <span className="text-sm font-medium text-green-500">● Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Payment Gateway</span>
              <span className="text-sm font-medium text-green-500">● Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Email Service</span>
              <span className="text-sm font-medium text-green-500">● Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
