import { useState } from "react";
import OrderDetails from "./OrderDetails";
import OrderF from "./order";
import { useNavigate } from "react-router-dom";
import { baseUrl } from '@/baseUrl';
import axios from "axios";

const Orders = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    navigate(`${orderId}`); 
  };

  const handleBack = () => {
    setSelectedOrderId(null);
  };

  // Mock data for the selected order
  const mockOrderData = {
    orderId: selectedOrderId || "32543",
    status: {
      paid: true,
      fulfilled: true,
      date: "Aug 17, 2020, 5:48 (ET)",
    },
    products: [
      {
        name: "Topman shoe in green",
        price: 21.00,
        quantity: 2,
        total: 42.00,
        details: {
          gender: "Women",
          color: "Green",
          size: "UK 7",
        },
      },
      {
        name: "Office Notebook",
        price: 9.00,
        quantity: 1,
        total: 9.00,
        details: {
          color: "Gray",
          size: "Standard",
        },
      },
      {
        name: "RayBan sunglasses",
        price: 14.00,
        quantity: 1,
        total: 14.00,
        details: {
          gender: "Unisex",
          color: "Black",
          size: "One size",
        },
      },
    ],
    customer: {
      name: "Amanda Harvey",
      email: "ella@site.com",
      phone: "+1 (609) 972-22-22",
      orders: 7,
      avatar: "/placeholder.svg",
    },
    shipping: {
      address: {
        street: "45 Roker Terrace",
        city: "Latheronwheel",
        country: "UK",
        postalCode: "KW5 8NW, London",
      },
      activity: [
        {
          status: "Delivered",
          time: "4:17 AM",
          date: "WEDNESDAY, 19 AUGUST",
        },
        {
          status: "Out for delivery",
          time: "2:38 AM",
          date: "WEDNESDAY, 19 AUGUST",
        },
        {
          status: "Package arrived at the final delivery station",
          time: "2:00 AM",
          date: "WEDNESDAY, 19 AUGUST",
        },
        {
          status: "Tracking number",
          trackingNumber: "3981241023109293",
          time: "6:29 AM",
          date: "TUESDAY, 18 AUGUST",
        },
        {
          status: "Package has dispatched",
          time: "6:29 AM",
          date: "TUESDAY, 18 AUGUST",
        },
        {
          status: "Order was placed",
          time: "Order #32543",
          date: "TUESDAY, 18 AUGUST",
        },
      ],
    },
    payment: {
      subtotal: 65.00,
      shipping: 0.00,
      tax: 7.00,
      total: 65.00,
      method: {
        type: "Mpesa",
        cardNumber: "************4291",
      },
    },
  };


  //for viewdetails of an order
  return (
    <div className="min-h-screen bg-gray-50">
      {selectedOrderId ? (
        <OrderDetails {...mockOrderData} onBack={handleBack} />
      ) : (
        <OrderF onViewDetails={handleViewDetails} />
      )}
    </div>
  );
};

export default Orders;