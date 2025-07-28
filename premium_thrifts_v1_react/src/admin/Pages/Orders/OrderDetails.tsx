import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Printer } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { useLocation, useParams } from 'react-router-dom';
import {Product, OrderDetailsProps, ShippingActivity} from './types';

const OrderDetails: React.FC<OrderDetailsProps> = ({
  orderId,
  status,
  products,
  customer,
  shipping,
  payment,
  onBack
}: OrderDetailsProps) => {

  const {id} = useParams();

  const location = useLocation();
 
  useEffect(() => {
    function loadPreviousPage() {
      console.log("Loading previous page content for:", location.pathname);
    } 
    window.addEventListener("popstate", () => {
      console.log("Back navigation detected:", location.pathname);
      // Restore content for previous page
      loadPreviousPage();
    });

    return () => window.removeEventListener("popstate", () => {});
  }, [location]);

const handlePrint = () => {
  const orderDetails = document.getElementById("orderDetails");

  if (!orderDetails) {
    toast.error("Order details not found!");
    return;
  }

  html2canvas(orderDetails, { scale: 2 })
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = 210;
      const imgHeight = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, imgHeight);
      pdf.save("order-details.pdf");
    })
    .catch((error) => toast.error("Error: " + error.message));
};

  return (
    <div className="min-h-screen  bg-background p-6" id="orderDetails">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Orders</span>
            <span>/</span>
            <span>Order details for {id}</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">Order #{orderId}</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Paid
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Fulfilled
            </Badge>
            <span className="text-sm text-muted-foreground">{status.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="gap-2" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            Print order
          </Button>
          <Button variant="outline">More options</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold">Order details</h2>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {products.map((product, index) => (
                  <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className="h-20 w-20 rounded-lg bg-gray-100" />
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {product.details.gender && <div>Gender: {product.details.gender}</div>}
                        <div>Color: {product.details.color}</div>
                        <div>Size: {product.details.size}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div>${product.price.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Quantity: {product.quantity}</div>
                      <div className="font-medium">${product.total.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Shipping activity</h2>
              <Badge variant="outline">Marked as fulfilled</Badge>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-6">
                {shipping.activity.map((activity, index) => (
                  <div key={index} className="relative flex gap-4">
                    <div className="absolute left-2 top-2 h-full w-px bg-border" />
                    <div className="relative z-10 h-4 w-4 rounded-full border bg-background" />
                    <div className="flex-1 space-y-1">
                      <div className="font-medium">{activity.status}</div>
                      {activity.trackingNumber && (
                        <div className="text-sm text-blue-600">
                          {activity.trackingNumber}
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Customer</h2>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {customer.orders} orders
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="text-sm font-medium">Contact info</div>
                  <div className="mt-1 space-y-2 text-sm text-muted-foreground">
                    <div>{customer.email}</div>
                    <div>{customer.phone}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Shipping address</h2>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <div>{shipping.address.street}</div>
                <div>{shipping.address.city}</div>
                <div>{shipping.address.country}</div>
                <div>{shipping.address.postalCode}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Billing address</h2>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <div>{shipping.address.street}</div>
                <div>{shipping.address.city}</div>
                <div>{shipping.address.country}</div>
                <div>{shipping.address.postalCode}</div>
              </div>
              <div className="mt-4">
                <div className="font-medium">Mpesa</div>
                <div className="text-sm text-muted-foreground">
                  Mobile Number: {payment.method.cardNumber}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="mt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${payment.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping fee:</span>
                  <span>${payment.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>${payment.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${payment.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Amount paid:</span>
                  <span>${payment.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;