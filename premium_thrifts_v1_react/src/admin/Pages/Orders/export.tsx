import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ExportOrders = ({ orders }: { orders: any[] }) => {
    const downloadCSV = () => {
        let csv = "Order ID,Customer Name,Total Amount,Status,Date\n";

        orders.forEach(order => {
            csv += `${order.id},"${order.customer_name}",${order.total_amount},${order.status},${order.created_at}\n`;
        });

        // Create Blob and trigger download
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "orders.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="p-6 space-y-6 bg-background">
            <div className="flex justify-between items-center">
                <div className="relative w-72">
                    <Input type="search" placeholder="Search orders..." className="pl-10" />
                    <svg
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                {/* Move the button inside ExportOrders */}
                <Button className="flex items-center gap-2" onClick={downloadCSV}>
                    <FileDown className="h-4 w-4" />
                    Export all orders
                </Button>
            </div>
        </div>
    );
};

export default ExportOrders;
