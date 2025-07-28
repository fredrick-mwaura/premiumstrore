import React, { useEffect, useState } from 'react';
import { Eye, PenLine, Trash2, FileDown, CreditCard, Copy, Printer, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Paginate from '@/admin/Paginate';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {PaymentMethod, Order} from './types';
import { baseUrl } from '@/baseUrl';
import axios from 'axios';

type mockOrders = {
  id: string;
  product: { name: string; image: string };
  customerName: string;
  price: number;
  quantity: number;
  payment: number;
  status: "Success" | "Pending" | "Cancel";
  tracking: string;
  paymentMethod: { type: "Mpesa" | "paypal"; value: string };
};
const itemsPerPageOptions = [10, 14, 20, 50, 100];

interface OrdersTableProps {
  onViewDetails: (orderId: string) => void;
}

const OrderF: React.FC<OrdersTableProps> = ({ onViewDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [orders, setOrders] = useState<Order[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancel':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const fetOrder = async () => {
    try{
      const response = await axios.get(`${baseUrl}/pth/orders`, {
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true
      })
      console.log('dsjbhjdsbgjflsgnjfsg')
      if(response.data && response.data.length > 0){
        setOrders(response.data);
       }
    }catch(error){
      console.log('orders error: ', error)
    }
  }
  useEffect(()=>{
    fetOrder();
  }, []);

const totalItems = orders.length;
const totalPages = Math.ceil(totalItems/itemsPerPage);

  // const handleAddPayment = (orderId: string) => {
  //   console.log('Adding payment method for order:', orderId);
  // };

  // const handleExport = (type: 'excel' | 'pdf') => {
  //   console.log('Exporting as:', type);
  // };

  const handleCopy = (orderId: string) => {
    console.log('Copying order:', orderId);
  };

  const handlePrint = (orderId: string) => {
    console.log('Printing order:', orderId);
  };

  const handleDelete = (orderId: string) => {
    console.log(`Deleting order:', ${orderId}`);
  };

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('page number changed', page);
  };

  const downloadCSV = () => {
    let csv = "Order ID,Customer Name,Total Amount,Status,Date\n";

    orders.forEach(order => {
        csv += `${order.id}, "${order.product?.name || 'N/A'}", "${order.customerName}",${order.payment},${order.status},${new Date().toISOString()}\n`;
    });    

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    window.URL.revokeObjectURL(url);
};

  return (
    <div className="p-6 space-y-6  bg-background">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-10"
          />
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
        <Button className="flex items-center gap-2" onClick={downloadCSV}>
          <FileDown className="h-4 w-4" />
          Export all orders
        </Button>
      </div>

      <div className="rounded-lg border  bg-background shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tracking</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id} onClick={()=>onViewDetails(order.id)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <span className="font-medium">{order.customerName}</span>
                  </div>
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>${order.price.toFixed(2)}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {order.paymentMethod.type.toLowerCase() === 'mpesa' ? (
                      <img src="/mpesa.png" alt="mpesa" className="h-6 w-6" />
                    ) : (
                      <img src="/paypal.png" alt="PayPal" className="h-6 w-6" />
                    )}
                    <span className="text-sm text-gray-600">{order.paymentMethod.value}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-blue-500">{order.tracking}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                    //   variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(order.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                        // variant="ghost" 
                        size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-auto">
                        <DropdownMenuItem onClick={() => handleCopy(order.id)}>
                          <Copy className="mr-2 h-4 w-4" /> Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePrint(order.id)}>
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(order.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <span>Showing:</span>
          <Select onValueChange={(value) => setItemsPerPage(Number(value))} defaultValue={itemsPerPage.toString()}>
            <SelectTrigger className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center focus:ring-2 focus:ring-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {itemsPerPageOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>of {totalItems}</span>
        </div>
        <div>
          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderF;