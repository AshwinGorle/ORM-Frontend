import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, IndianRupee, UserCheck, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="p-2 bg-primary/10 rounded-full">
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Today's Customers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            {/* <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-green-500 mr-1">+12%</span>
              vs. yesterday
            </div> */}
          </CardContent>
        </Card>

        {/* Today's Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹48,574</div>
            {/* <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-green-500 mr-1">+8%</span>
              vs. yesterday
            </div> */}
          </CardContent>
        </Card>

        {/* Monthly Customers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Customers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,283</div>
            {/* <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-green-500 mr-1">+15%</span>
              vs. last month
            </div> */}
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
            <div className="text-2xl font-bold">₹12,45,832</div>
            {/* <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-green-500 mr-1">+23%</span>
              vs. last month
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}