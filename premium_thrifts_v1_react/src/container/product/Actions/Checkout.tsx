import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeliveryForm } from './checkout/delivery';
import { PaymentMethodSelection } from './checkout/selectPayment';
import { PaymentDetailsForm } from './checkout/payment';
import { OrderSummary } from './orderSummary';
import { useCart } from '../CartContexts';
import OrderSuccess from './SuccessOrder';
import { ShoppingCart, Truck, CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

// Types
export type DeliveryFormData = {
  firstName: string;
  lastName: string;
  location: string;
  apartmentName?: string;
  houseNumber?: string;
  countryCode: string;
  phoneNumber: string;
  email?: string;
};

export type PaymentFormData = {
  paymentMethod: 'mpesa' | 'paypal' | 'card';
  cardNumber?: string;
  cardExpiry?: string;
  cardCVV?: string;
  paypalEmail?: string;
  mpesaNumber?: string;
};

export type CheckoutFormData = DeliveryFormData & PaymentFormData;

const Checkout: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'delivery' | 'payment'>('delivery');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentFormData['paymentMethod'] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { cart } = useCart();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>();

  // Calculate order totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 445 : 0;
  const total = subtotal + deliveryFee;

  const validateDeliveryForm = async () => {
    const isValid = await trigger([
      'firstName', 
      'lastName', 
      'location', 
      'phoneNumber',
      'email'
    ]);
    const token = localStorage.getItem('token');

    try{
      const saveAddress = await axios.post('http://localhost:8000/api/save-address', {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,

        }
      });

      if(saveAddress.status != 201) return;

      if(saveAddress.status == 201){
        console.log('success')
      }

    }catch(error){
      console.log('error in saving address: ', error);
    }


    if (isValid) {
      setActiveSection('payment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      // API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Order submitted:', { ...data, cart, total });
      setIsSuccess(true); // replace true
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <OrderSuccess />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white p-4 sticky top-0 z-10 shadow-md mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Complete Your Purchase
          </h1>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-1">
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Checkout Progress */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2">
              <div 
                className="h-full bg-brand-600 transition-all duration-300"
                style={{ width: activeSection === 'delivery' ? '0%' : '100%' }}
              ></div>
            </div>
            <div className="relative flex justify-between">
              <motion.div 
                className={`flex flex-col items-center cursor-pointer ${activeSection === 'delivery' ? 'text-brand-600' : 'text-muted-foreground'}`}
                onClick={() => setActiveSection('delivery')}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-md 
                  ${activeSection === 'delivery' ? 'bg-brand-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                  <Truck className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Delivery</span>
              </motion.div>
              <motion.div 
                className={`flex flex-col items-center cursor-pointer ${activeSection === 'payment' ? 'text-brand-600' : 'text-muted-foreground'}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-md 
                  ${activeSection === 'payment' ? 'bg-brand-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Payment</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="md:col-span-2 space-y-6">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="w-full shadow-md border border-border/50 overflow-hidden">
                {activeSection === 'delivery' && (
                  <DeliveryForm 
                    register={register}
                    errors={errors}
                    onContinue={validateDeliveryForm}
                  />
                )}

                {activeSection === 'payment' && (
                  <>
                    <CardHeader className="border-b bg-muted/30">
                      <CardTitle className="text-xl text-brand-600 flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-8">
                      <PaymentMethodSelection 
                        selectedPaymentMethod={selectedPaymentMethod}
                        onSelectPaymentMethod={setSelectedPaymentMethod}
                      />

                      {selectedPaymentMethod && (
                        <div className="animate-fade-in">
                          <PaymentDetailsForm 
                            register={register}
                            errors={errors}
                            paymentMethod={selectedPaymentMethod}
                            phoneNumber={watch('phoneNumber')}
                          />
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        onClick={handleSubmit(onSubmit)}
                        disabled={!selectedPaymentMethod || isSubmitting}
                        className={`
                          w-full py-6 text-lg font-medium transition-all duration-300
                          ${!selectedPaymentMethod || isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01]'}
                        `}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                            Processing...
                          </span>
                        ) : (
                          `Pay $ ${total.toLocaleString()}`
                        )}
                      </Button>
                    </CardContent>
                  </>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Order Summary Section */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <OrderSummary 
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                total={total}
                cart={cart}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;