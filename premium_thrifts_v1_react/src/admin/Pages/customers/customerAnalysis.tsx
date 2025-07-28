import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Users, TrendingUp, ShoppingBag, DollarSign } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";

const dailyData = [
  { date: "Mon", signUps: 5 },
  { date: "Tue", signUps: 22 },
  { date: "Wed", signUps: 58 },
  { date: "Thu", signUps: 55 },
  { date: "Fri", signUps: 48 },
  { date: "Sat", signUps: 85 },
  { date: "Sun", signUps: 92 },
];

const weeklyData = [
  { date: "1", signUps: 200 },
  { date: "2", signUps: 300 },
  { date: "3", signUps: 200 },
  { date: "4", signUps: 100 },
  { date: "5", signUps: 500 },
  { date: "6", signUps: 330 },
  { date: "7", signUps: 360 },
  { date: "8", signUps: 470 },
  { date: "9", signUps: 560 },
  { date: "10", signUps: 700 },
];


const monthlyData = [
  { date: "Jan", signUps: 1200 },
  { date: "Feb", signUps: 1400 },
  { date: "Mar", signUps: 1600 },
  { date: "Apr", signUps: 1500 },
  { date: "May", signUps: 1800 },
  { date: "Jun", signUps: 2100 },
  { date: "Jul", signUps: 2300 },
  { date: "Aug", signUps: 2400 },
  { date: "Sep", signUps: 2200 },
  { date: "Oct", signUps: 2500 },
  { date: "Nov", signUps: 2700 },
  { date: "Dec", signUps: 3000 },
];

const customerSegments = [
  { name: "New", value: 400 },
  { name: "Regular", value: 300 },
  { name: "sellers", value: 200 },
  { name: "Inactive", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatsCard = ({ title, value, icon: Icon, description }: {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
}) => {

 
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-muted-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-xs text-green-700">{description}</span>
        </div>
        <div>
          <p className="text-2xl font-bold ">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const CustomerAnalysis = () => {

  const[timePeriod, setTimePeriod] = useState('daily');

  const getChartdata = () =>{
    switch (timePeriod) {
      case 'weekly':
        return weeklyData
      case 'monthly':
        return monthlyData  
    
      default:
        return dailyData
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Customers"
          value="2,345"
          icon={Users}
          description="+5% from last month"
        />
        <StatsCard
          title="Average Order Value"
          value="$.589.99"
          icon={ShoppingBag}
          description="+2.5% from last month"
        />
        <StatsCard
          title="Customer Lifetime Average Value"
          value="$.4, 158"
          icon={DollarSign}
          description="+8% from last month"
        />
        <StatsCard
          title="Growth Rate"
          value="12%"
          icon={TrendingUp}
          description="+3% from last month"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
      <Card>
          <CardHeader>
            <CardTitle>Customer Signup Trends</CardTitle>
          </CardHeader>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold ml-3">SignUps Trend</h2>
            <RadioGroup
              value={timePeriod}
              onValueChange={setTimePeriod}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">Daily</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly</Label>
              </div>
            </RadioGroup>
          </div>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartdata()}>
                  {/* {console.log("Rendering chart with data:", getChartdata())} */}
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="signUps"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={{ fill: "#4F46E5" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Customer active Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerAnalysis;