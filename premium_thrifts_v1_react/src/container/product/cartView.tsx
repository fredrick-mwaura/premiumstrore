import React from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Trash2, Tag, CreditCard, MinusCircle, PlusCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCart } from "./CartContexts";
// import SimilarProducts from './Actions/similarProducts'


const CartView = () => {
  const { cart, handleRemove, updateQuantity, totalItems } = useCart();
  const navigate = useNavigate();
    
  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = totalItems > 0 ? 45 : 0;
  const discount = totalItems > 0 ? 10 : 0;
  const total = subtotal + deliveryFee - discount;
  console.log(totalItems)

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      {/* <div className="bg-primary py-6 px-4">
        <div className="container mx-auto flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full bg-white hover:bg-white/30 text-white">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" /> Your Shopping Cart
          </h1>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-8">
        {totalItems === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm my-8">
            <div className="flex justify-center mb-4">
              <div className="p-6 bg-muted/20 rounded-full">
                <ShoppingCart size={64} className="text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet.
              Browse our products and find something you'll love!
            </p>
            <Link to="/">
              <Button className="px-8">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            {/* Left Section - Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-sm border">
                <CardHeader className="border-b bg-muted/10 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Cart
                      <Badge variant="outline" className="ml-2 rounded-full px-3 font-normal">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                      </Badge>
                    </CardTitle>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="text-muted-foreground"
                      onClick={() => navigate('/')}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0 divide-y">
                  {cart.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-4 md:p-6 hover:bg-muted/5 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-shrink-0 bg-gray-50 rounded-lg p-3 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mx-auto sm:mx-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <h3 className="font-medium text-lg">{item.title}</h3>
                          {/* <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{item.description}</p> */}
                          <p className="font-bold text-lg mb-3">$ {item.price.toLocaleString()}</p>
                          
                          <div className="flex flex-wrap items-center gap-3 mt-auto">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Size:</span>
                              <select className="border rounded-md p-1 text-sm bg-background w-20">
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                              </select>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Qty:</span>
                              <div className="flex items-center border rounded-md">
                                <Button 
                                  type="button"
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-none"
                                  onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <MinusCircle size={16} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button 
                                  type="button"
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-none"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <PlusCircle size={16} />
                                </Button>
                              </div>
                            </div>

                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemove(item.id)}
                              className="text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-1 ml-auto"
                            >
                              <Trash2 size={14} />
                              <span>Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Section - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 shadow-sm border">
                <CardHeader className="border-b bg-muted/10 pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Promo Code */}
                  <div className="mb-6">
                    <p className="flex items-center mb-2 font-medium">
                      <Tag size={16} className="mr-2 text-primary" />Enter Promo Code
                    </p>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter promo code" 
                        className="flex-1"
                      />
                      <Button>Apply</Button>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2">
                      <span>Subtotal</span>
                      <span className="font-medium">$ {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Delivery</span>
                      <span className="font-medium">$ {deliveryFee.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between py-2 text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">-$ {discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-4 border-t border-b font-bold text-base mt-4">
                      <span>Total</span>
                      <span className="text-primary">$ {total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col p-6">
                  <Button 
                    className="w-full h-12 font-semibold" 
                    onClick={()=> {
                      navigate('/checkout');
                      toast.success("Proceeding to checkout");
                    }}
                  >
                    <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    Taxes and shipping calculated at checkout
                  </p>
                </CardFooter>
              </Card>
              
              {/* Payment Methods */}
              <div className="mt-4 p-4 bg-white rounded-lg border shadow-sm">
                <p className="text-sm font-medium mb-3">Accepted Payment Methods</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {/* Replace with actual payment method logos */}
                  {["Visa", "Mastercard", "PayPal", "M-Pesa"].map(method => (
                    <Badge key={method} variant="outline" className="bg-gray-50">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <SimilarProducts/> */}
    </div>
  );
};

export default CartView;