import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Stats from "./stats";
import TopProducts from "./topProducts";
import {dailyData, weeklyData, monthlyData} from './Data';

const Revenue = () => {
  const [timePeriod, setTimePeriod] = useState("daily"); 

  const getChartData = () => {
    switch (timePeriod) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      default:
        console.log(dailyData);
        return dailyData;
    }
  };

  return (
    <div className="p-8 w-full mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Revenue </h1>
      
      <Stats />

      {/* Revenue Chart */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Revenue Trend</h2>
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
        <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={getChartData()}>
            {console.log("Rendering chart with data:", getChartData())}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ fill: "#4F46E5" }}
            />
          </LineChart>
        </ResponsiveContainer>

        </div>
      </Card>

      <TopProducts />
    </div>
  );
};

export default Revenue;