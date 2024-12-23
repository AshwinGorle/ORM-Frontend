"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, IndianRupee, UserCheck, TrendingUp } from "lucide-react";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import TopDishesCard from "@/components/dashboard/top-dishes/TopDishesCard";
import { useFetchDashboard } from "@/hooks/dashboard/useFetchDashboard";
import DashboardLoading from "./loading";

export default function DashboardPage() {
  const { data, loading } = useFetchDashboard();
  const [customers, setCustomers] = useState(data?.customers);
  const [revenue, setRevenue] = useState(data?.revenue);
  const [customersByDate, setCustomersByDate] = useState(data?.customersByDate);
  const [revenueByDate, setRevenueByDate] = useState(data?.revenueByDate);
  const [thisMonthDishes, setThisMonthDishes] = useState(data?.thisMonthDishes);

  useEffect(() => {
    if (!loading && data) {
      setCustomers(data?.customers);
      setRevenue(data?.revenue);
      setCustomersByDate(data?.customersByDate);
      setRevenueByDate(data?.revenueByDate);
      setThisMonthDishes(data?.thisMonthDishes);
    }
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="p-2 bg-primary/10 rounded-full">
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>
      </div>

      {loading ?
        <DashboardLoading/> :
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Today's Customers */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers?.today}</div>
              </CardContent>
            </Card>

            {/* Today's Revenue */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{revenue?.today}</div>
              </CardContent>
            </Card>

            {/* Monthly Customers */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Customers</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers?.monthly}</div>
              </CardContent>
            </Card>

            {/* Monthly Revenue */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <div className="flex items-center justify-center h-4 w-4 text-muted-foreground">
                  <IndianRupee className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{revenue?.monthly}</div>
              </CardContent>
            </Card>
          </div>

          <DashboardCharts data={{ revenueByDate, customersByDate }} />
          <TopDishesCard data={thisMonthDishes} />
        </>
      }
    </div>
  );
}