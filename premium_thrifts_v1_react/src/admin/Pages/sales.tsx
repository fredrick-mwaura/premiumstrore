import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';

// Mock data (replace with real data later)
// Monthly sales data for clothes (all 12 months)
const salesData = [
  { name: 'Jan', sales: 5200 },
  { name: 'Feb', sales: 4800 },
  { name: 'Mar', sales: 6000 },
  { name: 'Apr', sales: 6500 },
  { name: 'May', sales: 7000 },
  { name: 'Jun', sales: 7500 },
  { name: 'Jul', sales: 8000 },
  { name: 'Aug', sales: 8200 },
  { name: 'Sep', sales: 7800 },
  { name: 'Oct', sales: 8400 },
  { name: 'Nov', sales: 9000 },
  { name: 'Dec', sales: 9500 },
];

// Top clothing products by sales and revenue
export const topProducts = [
  { name: 'Classic T-Shirt', sales: 150, revenue: 45000 },
  { name: 'Blue Jeans', sales: 130, revenue: 20500 },
  { name: 'Leather Jacket', sales: 90, revenue: 30500 },
];

// Recent orders for clothing items
const recentOrders = [
  { id: '#A001', customer: 'Alice Brown', amount: 5999, status: 'Completed' },
  { id: '#A002', customer: 'Bob Smith', amount: 8999, status: 'Processing' },
  { id: '#A003', customer: 'Charlie Green', amount: 12999, status: 'Completed' },
];


const MetricCard = ({ title, value, change, icon: Icon, trend }: { 
  title: string;
  value: string;
  change: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  trend: 'up' | 'down';
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="bg-purple-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <span className={`flex items-center text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
          {trend === 'up' ? <ArrowUpRight className="w-4 h-4 ml-1" /> : <ArrowDownRight className="w-4 h-4 ml-1" />}
        </span>
      </div>
      <h3 className="text-2xl font-bold mt-4">{value}</h3>
      <p className="text-muted-foreground text-sm">{title}</p>
    </CardContent>
  </Card>
);

const Sales = () => {
  const [timeframe, setTimeframe] = useState('7d');

  return (
    <div className="p-6 space-y-6 w-full mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Sales Analytics</h2>
        <Tabs defaultValue="7d" className="w-[300px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="7d" onClick={() => setTimeframe('7d')}>7D</TabsTrigger>
            <TabsTrigger value="30d" onClick={() => setTimeframe('30d')}>30D</TabsTrigger>
            <TabsTrigger value="90d" onClick={() => setTimeframe('90d')}>90D</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Sales"
          value="$.48,560"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          title="Total Orders"
          value="1,205"
          change="+8.2%"
          icon={ShoppingCart}
          trend="up"
        />
        <MetricCard
          title="Avg Order Value"
          value="$.125"
          change="-3.1%"
          icon={TrendingUp}
          trend="down"
        />
        <MetricCard
          title="Products Sold"
          value="8,234"
          change="+5.3%"
          icon={Package}
          trend="up"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#9b87f5"
                  fillOpacity={1}
                  fill="url(#salesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-background border rounded-lg">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                </div>
                <p className="font-semibold">$.{product.revenue}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-background border rounded-lg">
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$.{order.amount}</p>
                  <p className="text-sm text-green-500">{order.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sales;