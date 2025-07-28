import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {topProducts} from './Pages/sales';

const stats = [
  {
    title: "Total Revenue",
    value: "$405,231.89",
    icon: DollarSign,
    trend: "+20.1%",
    trendUp: true,
  },
  {
    title: "Orders",
    value: "2,672",
    icon: ShoppingCart,
    trend: "+12.2%",
    trendUp: true,
  },
  {
    title: "Customers",
    value: "2,420",
    icon: Users,
    trend: "+8.1%",
    trendUp: true,
  },
  {
    title: "Products",
    value: "145",
    icon: Package,
    trend: "+2.3%",
    trendUp: true,
  },
];

const monthlyData = [
  { month: 'Jan', revenue: 35000, orders: 280, customers: 100 },
  { month: 'Feb', revenue: 38000, orders: 300, customers: 1000 },
  { month: 'Mar', revenue: 42000, orders: 320, customers: 1100 },
  { month: 'Apr', revenue: 45231, orders: 356, customers: 2420 },
  { month: 'may', revenue: 35000, orders: 270, customers: 2910 },
  { month: 'jun', revenue: 38000, orders: 200, customers: 3040 },
  { month: 'jul', revenue: 42000, orders: 390, customers: 3400 },
  { month: 'aug', revenue: 45231, orders: 556, customers: 3920 }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* <h1 className="text-2xl font-semibold">Dashboard Overview</h1> */}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="h-8 w-8 text-primary" />
              <span
                className={`text-sm ${
                  stat.trendUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trend}
              </span>
            </div>
            <h2 className="text-2xl font-semibold mt-4">{stat.value}</h2>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Orders Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="customers" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          </Card>
          <Card className='p-6'>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Top Products</h3>
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                  </div>
                  <p className="font-semibold">$.{product.revenue}</p>
                </div>
              ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}