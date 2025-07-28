import React from 'react';
import { AlertTriangle } from 'lucide-react';
import ProfileLayout from './Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from '../../container/footer';

// Mock data for messages
const messages = [
  {
    date: "03 February",
    status: "Cancelled",
    orderId: "329824618",
    items: [
      {
        name: "Plain Anti-Skid Mouse Pad (black)",
        image: "/jacket.png"
      }
    ]
  },
  {
    date: "29 January",
    status: "Cancelled",
    orderId: "381886218",
    items: [
      {
        name: "SUNSET WITH DEERS MOUSEPADS",
        image: "/image.png"
      }
    ]
  },
  {
    date: "27 January",
    status: "Ready for pickup",
    orderId: "DS-MEV-329824618-8159",
    description: "Your package(s) DS-MEV-329824618-8159 is ready for pickup from Jumia JBN Express Muranga Station. You have 5 business days to pick it up. Please remember to bring the 389 KES when collecting your package. We highly encourage you to thoroughly inspect your order at the pickup station before leaving the station to ensure that it meets your expectations. Thank you for shopping on Jumia!",
    items: [
      {
        name: "Plain Anti-Skid Mouse Pad (black)",
        image: "/image copy.png"
      }
    ]
  }
];

const ProfileInbox = () => {
  return (
    <>
      <ProfileLayout title="Inbox Messages">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="text-gray-600">{message.date}</div>
                <Button variant="link" className="text-purple-500">See Details</Button>
              </div>
              <CardContent className="p-4">
                {message.status === "Cancelled" ? (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-purple-500" />
                      <span className="font-semibold">Cancelled</span>
                    </div>
                    <p className="text-gray-700">
                      Item(s) in your order no. {message.orderId} have been cancelled. Please check your email for more details.
                      If you need assistance placing a new order, please call Sales Support team at 0711 011 011
                    </p>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="font-semibold mb-2">Ready for pickup</div>
                    <p className="text-gray-700">{message.description}</p>
                  </div>
                )}
                
                <div className="mt-4 p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img 
                        src={message.items[0].image} 
                        alt={message.items[0].name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>{message.items[0].name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ProfileLayout>
      <Footer />
    </>
  );
};

export default ProfileInbox;
