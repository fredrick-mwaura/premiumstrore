import React from 'react';
import { Input } from '@/components/ui/input';
import { PaymentFormData } from './Checkout';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type PaymentDetailsFormProps = {
  register: UseFormRegister<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
  paymentMethod: PaymentFormData['paymentMethod'];
};

export const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({ 
  register, 
  errors, 
  paymentMethod 
}) => {
  const renderPaymentMethodDetails = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <Input 
                {...register('cardNumber', { 
                  required: 'Card number is required',
                  pattern: {
                    value: /^[0-9]{16}$/,
                    message: 'Please enter a valid 16-digit card number'
                  }
                })} 
                placeholder="1234 5678 9012 3456" 
                className="w-full"
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <Input 
                  {...register('cardExpiry', { 
                    required: 'Expiry date is required',
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                      message: 'Please use MM/YY format'
                    }
                  })} 
                  placeholder="MM/YY" 
                  className="w-full"
                />
                {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <Input 
                  {...register('cardCVV', { 
                    required: 'CVV is required',
                    pattern: {
                      value: /^[0-9]{3,4}$/,
                      message: 'Please enter a valid CVV'
                    }
                  })} 
                  placeholder="123" 
                  className="w-full"
                />
                {errors.cardCVV && <p className="text-red-500 text-sm mt-1">{errors.cardCVV.message}</p>}
              </div>
            </div>
          </div>
        );
      case 'paypal':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PayPal Email</label>
            <Input 
              {...register('paypalEmail', { 
                required: 'PayPal email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })} 
              placeholder="you@example.com" 
              className="w-full"
            />
            {errors.paypalEmail && <p className="text-red-500 text-sm mt-1">{errors.paypalEmail.message}</p>}
          </div>
        );
      case 'mpesa':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">M-Pesa Phone Number</label>
            <Input 
              {...register('mpesaNumber', { 
                required: 'M-Pesa number is required',
                pattern: {
                  value: /^(0|254)?7[0-9]{8}$/,
                  message: 'Please enter a valid Kenyan phone number'
                }
              })} 
              placeholder="07XXXXXXXX" 
              className="w-full"
            />
            {errors.mpesaNumber && <p className="text-red-500 text-sm mt-1">{errors.mpesaNumber.message}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 capitalize">
        {paymentMethod} Details
      </h3>
      {renderPaymentMethodDetails()}
    </div>
  );
};