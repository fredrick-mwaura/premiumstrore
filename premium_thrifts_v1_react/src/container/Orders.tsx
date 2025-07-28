import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProfileLayout from '@/pages/profile/Layout';

// Mock data for demonstration
const mockOrders = [
  {
    id: 'ORD-381886218',
    name: 'BM007, Bluetooth 5.2/3.0 And 2.4G Three Modes Wireless RGB Mouse - Black',
    image: '/lovable-uploads/8dedf6f6-fe54-4871-87b1-a321be7f119c.png',
    status: 'delivered',
    date: '21-01',
    isReturned: false,
  },
  {
    id: 'ORD-457823912',
    name: 'Ultra-Thin Mechanical Keyboard with RGB Backlight - Silver',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'processing',
    date: '25-02',
    isReturned: false,
  },
  {
    id: 'ORD-578239156',
    name: 'Ergonomic Vertical Wireless Mouse with 6 Buttons - Grey',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'shipped',
    date: '18-03',
    isReturned: false,
  },
  {
    id: 'ORD-982347651',
    name: 'Noise Cancelling Wireless Headphones - Matte Black',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'cancelled',
    date: '10-01',
    isReturned: false,
  },
  {
    id: 'ORD-562398741',
    name: 'Portable 10000mAh Power Bank with Fast Charging - White',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'delivered',
    date: '15-02',
    isReturned: true,
  },
];

  // Function to render status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'delivered':
        return <Badge className="bg-green-500 hover:bg-green-600">DELIVERED</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500 hover:bg-blue-600">PROCESSING</Badge>;
      case 'shipped':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">SHIPPED</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">CANCELLED</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600">UNKNOWN</Badge>;
    }
  };

  // Function to render order card
  const renderOrderCard = (order: any) => (
    <Card key={order.id} className="mb-4 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-32 h-32 flex-shrink-0">
          <img 
            src={order.image || '/no-image.png'} 
            alt='no image' 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-medium mb-1">{order.name}</h3>
          <p className="text-gray-600 mb-2">Order {order.id}</p>
          <div className="flex items-center gap-2 mb-1">
            {getStatusBadge(order.status)}
            {order.isReturned && <Badge className="bg-purple-500 hover:bg-purple-600">RETURNED</Badge>}
          </div>
          <p className="text-gray-600">On {order.date}</p>
        </div>
        <div className="flex flex-col justify-center">
          <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50">
            See details
          </Button>
        </div>
      </div>
    </Card>
  );


const Order = () => {
  // Filter orders based on status
  const ongoingDeliveredOrders = mockOrders.filter(order => 
    ['processing', 'shipped', 'delivered'].includes(order.status) && !order.isReturned
  );
  
  const canceledReturnedOrders = mockOrders.filter(order => 
    order.status === 'cancelled' || order.isReturned
  );

  return (
    <ProfileLayout title="orders">

  <Card className='p-4'>  
    <div className="mx-auto">
      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="md:grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="ongoing" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 rounded-none">
            ONGOING/DELIVERED
          </TabsTrigger>
          <TabsTrigger value="canceled" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 rounded-none">
            CANCELED/RETURNED ({canceledReturnedOrders.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ongoing">
          {ongoingDeliveredOrders.length > 0 ? (
            ongoingDeliveredOrders.map(renderOrderCard)
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>You don't have any ongoing or delivered orders</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="canceled">
          {canceledReturnedOrders.length > 0 ? (
            canceledReturnedOrders.map(renderOrderCard)
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>You don't have any canceled or returned orders</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      </div>
      </Card>
    </ProfileLayout>

  );
};

export default Order;