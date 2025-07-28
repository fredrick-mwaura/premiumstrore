import { ArrowLeft, ArrowRight, CheckCircle2, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
// import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

interface OrderSuccessProps {
  orderNumber?: string;
  customerName?: string;
  estimatedDelivery?: Date;
  onTrackOrder?: () => void;
}

const OrderSuccess = ({
  orderNumber = "ORD-24680",
  customerName = "John Doe",
  estimatedDelivery = new Date(),
  onTrackOrder,
}: OrderSuccessProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
    toast({
      title: "Continue Shopping",
      description: "Redirecting you to our products",
    });
  };

  const handleTrackOrder = () => {
    if (onTrackOrder) {
      onTrackOrder();
    } else {
      toast({
        title: "Track Order",
        description: `Tracking order ${orderNumber}`,
      });
      // Default fallback if no callback is provided
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:max-w-3xl mt-4 rounded-xl">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-background rounded-t-lg flex flex-col items-center p-8">
          <div className="mb-4 rounded-full bg-background border p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-center">Order Placed Successfully!</CardTitle>
          <CardDescription className="text-lg text-center mt-2">
            Thank you for your purchase. Your order is being processed.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 px-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-muted-foreground">Customer Name:</span>
              <span className="font-medium">{customerName}</span>
            </div>
            <div className="flex justify-between items-center pb-4">
              <span className="text-muted-foreground">Estimated Delivery:</span>
              <span className="font-medium">{estimatedDelivery.toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-8 bg-background p-4 rounded-lg flex items-center">
            <Package className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h4 className="font-medium text-blue-800">Shipping in Progress</h4>
              <p className="text-blue-700 text-sm">We're preparing your order for shipping.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between p-8">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={handleContinueShopping}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
          <Button 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700" 
            onClick={handleTrackOrder}
          >
            Download receio\pt
            {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderSuccess;