
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from '../CartContexts';
import { motion } from 'framer-motion';

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  cart, 
  subtotal, 
  deliveryFee, 
  total 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="w-full shadow-md border border-border/50">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-xl text-brand-600 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Cart Items */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-start gap-4 pb-3 border-b last:border-b-0">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 rounded-md p-1 w-16 h-16 flex items-center justify-center bg-brand-50/50">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium text-sm">
                  $ {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">$ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium">$ {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-3 border-t font-bold text-base mt-2">
              <span>Total</span>
              <span className="text-brand-600">$ {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Taxes included. Shipping calculated at checkout.
          </p>
        </CardContent>
      </Card>

      {/* Mobile Continue Shopping Button */}
      <Button 
        variant="outline" 
        className="w-full mt-4 md:hidden flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors"
      >
        <ShoppingCart className="w-4 h-4" /> Continue Shopping
      </Button>
    </motion.div>
  );
}; 
