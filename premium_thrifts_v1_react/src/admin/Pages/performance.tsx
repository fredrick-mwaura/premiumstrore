import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Users, TrendingUp, ChevronDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";


const Performance = () => {
  // Sample data - in a real app, this would come from props or an API
  const salesData = [
    { month: 'Jan', revenue: 45000, orders: 380, customers: 420, Profit: 17500},
    { month: 'Feb', revenue: 52000, orders: 420, customers: 460, Profit: 15000},
    { month: 'Mar', revenue: 48000, orders: 400, customers: 440, Profit: 16000},
    { month: 'Apr', revenue: 61000, orders: 480, customers: 520, Profit: 19000},
    { month: 'May', revenue: 65000, orders: 520, customers: 580, Profit: 11000},
    { month: 'Jun', revenue: 72000, orders: 560, customers: 620, Profit: 13900}
  ];

  const calculateGrowth = (current, previous) => {
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(1);
  };

  const getLastTwoMonths = () => {
    const lastMonth = salesData[salesData.length - 1];
    const previousMonth = salesData[salesData.length - 2];
    return { lastMonth, previousMonth };
  };

  const { lastMonth, previousMonth } = getLastTwoMonths();

  const metrics = [
    {
      title: "Revenue",
      value: `$.${(lastMonth.revenue).toLocaleString()}`,
      change: calculateGrowth(lastMonth.revenue, previousMonth.revenue),
      icon: DollarSign
    },
    {
      title: "Orders",
      value: lastMonth.orders,
      change: calculateGrowth(lastMonth.orders, previousMonth.orders),
      icon: ShoppingCart
    },
    {
      title: "Customers",
      value: lastMonth.customers,
      change: calculateGrowth(lastMonth.customers, previousMonth.customers),
      icon: Users
    }
  ];

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <metric.icon className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                {parseFloat(metric.change) >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  parseFloat(metric.change) >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.change}%
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders vs Customers</CardTitle>
          </CardHeader>
          <div className="flex-col p-3 mb-2 key">
            <div className='flex justify-start'>
             <div className='bg-purple-400 m-1 h-4 w-4 rounded-sm'></div>
             <p>Orders</p>
            </div>
            <div className='flex justify-start'>
                <div className='bg-green-300 m-1 h-4 w-4 rounded-sm'></div>
                <p>Customers</p>
            </div>
          </div>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#8884d8" />
                  <Bar dataKey="customers" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
        <Card className="p-6 bg-background shadow-md rounded-lg w-[50%]">
          <div className="flex justify-between items-center mb-4">
          <CardTitle>Seller statistic</CardTitle>
            <div className="flex gap-2">
              {/* <Button variant="outline" className="text-sm flex items-center gap-1">
                Last 30 days <ChevronDown size={16} />
              </Button> */}
              <Button className="border bg-background hover:bg-muted cursor-pointer">
                <RefreshCw size={16} className="text-foreground" />
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="border bg-background hover:bg-muted cursor-pointer">
                      <RefreshCw size={16} className="text-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">This is a tooltip</TooltipContent>
                </Tooltip>
              </TooltipProvider>


            </div>
          </div>
          
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-xl font-bold">$343,000 <span className="text-green-500 text-sm">▲ 5.6%</span></p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Profit</p>
              <p className="text-xl font-bold">$92,400 <span className="text-green-500 text-sm">▲ 2.6%</span></p>
            </div>
          </div>
          
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fill: 'gray' }} />
                <YAxis />
                <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="revenue" fill="#007bff" stackId="a" />
                <Bar dataKey="Profit" fill="#a0c4ff" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
      </Card>
    </div>
  );
};

export default Performance;