import { Card } from "@/components/ui/card";

interface TopProduct {
  name: string;
  revenue: number;
  orders: number;
}

const TopProducts = () => {
  const topProducts: TopProduct[] = [
    { name: "Premium Headphones", revenue: 1115500, orders: 50 },
    { name: "Wireless Mouse", revenue: 81900, orders: 120 },
    { name: "Mechanical Keyboard", revenue: 75100, orders: 75 },
    { name: "4K Monitor", revenue: 66000, orders: 25 },
  ];

  const topSales: TopProduct[] = [
    { name: "High Heals", revenue: 172000, orders: 800 },
    { name: "denim jeans", revenue: 68900, orders: 725 },
    { name: "snickers", revenue: 70500, orders:  419},
    { name: "J4", revenue: 150000, orders: 235},
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols2 gap-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Top Products by Revenue</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-right py-3 px-4">Revenue</th>
                <th className="text-right py-3 px-4">Orders</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="text-right py-3 px-4">$. {product.revenue.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">{product.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Top Products by sales items</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-right py-3 px-4">Revenue</th>
                  <th className="text-right py-3 px-4">Orders</th>
                </tr>
              </thead>
              <tbody>
                {topSales.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="text-right py-3 px-4">$. {product.revenue.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">{product.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </Card>
    </div>
  );
};

export default TopProducts;