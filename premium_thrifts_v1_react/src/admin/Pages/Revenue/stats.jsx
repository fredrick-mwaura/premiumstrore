import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, CreditCard, Receipt } from "lucide-react";

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <h3 className="text-2xl font-bold">$. 1,112,400</h3>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+12.5% from last month</span>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <Receipt className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Orders</p>
            <h3 className="text-2xl font-bold">1,240</h3>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+8.2% from last month</span>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <CreditCard className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg. Order Value</p>
            <h3 className="text-2xl font-bold">$90.65</h3>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+3.1% from last month</span>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <TrendingUp className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Growth Rate</p>
            <h3 className="text-2xl font-bold">+12.5%</h3>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+2.3% from last month</span>
        </div>
      </Card>
    </div>
  );
};

export default Stats;