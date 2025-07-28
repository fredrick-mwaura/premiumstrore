import React, { useState } from 'react';
import ProfileLayout from './Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Footer from '../../container/footer';

const ProfileVouchers = () => {
  const [activeTab, setActiveTab] = useState("active");
  
  return (
    <>
      <ProfileLayout title="Vouchers">
        <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-xs mb-6 border-b flex p-0 h-auto rounded-none bg-transparent space-x-0">
            <TabsTrigger 
              value="active" 
              className={`flex-1 pb-2 rounded-none border-b-2 ${
                activeTab === 'active' 
                ? 'text-purple-500 border-purple-500' 
                : 'border-transparent text-gray-500'
              }`}
            >
              ACTIVE
            </TabsTrigger>
            <TabsTrigger 
              value="inactive" 
              className={`flex-1 pb-2 rounded-none border-b-2 ${
                activeTab === 'inactive' 
                ? 'text-purple-500 border-purple-500' 
                : 'border-transparent text-gray-500'
              }`}
            >
              INACTIVE
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <img 
                  src="/site-assets/voucher.png" 
                  alt="Voucher icon" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-lg font-medium">You currently have no available Vouchers</h3>
              <p className="text-gray-600">All your available Jumia Vouchers will be displayed here</p>
              <Button className="bg-purple-500 hover:bg-purple-600">Continue Shopping</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <img 
                  src="/site-assets/voucher.png" 
                  alt="Voucher icon" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-lg font-medium">You have no inactive vouchers</h3>
              <p className="text-gray-600">Expired and used vouchers will be displayed here</p>
              <Button className="bg-purple-500 hover:bg-purple-600">Continue Shopping</Button>
            </div>
          </TabsContent>
        </Tabs>
      </ProfileLayout>
      <Footer />
    </>
  );
};

export default ProfileVouchers;