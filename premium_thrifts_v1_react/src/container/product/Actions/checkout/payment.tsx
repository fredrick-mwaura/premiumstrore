import React from 'react';
import { Input } from '@/components/ui/input';
import type { PaymentFormData } from '../Checkout';
import { 
  UseFormRegister,
  FieldErrors
} from 'react-hook-form';
import { motion } from 'framer-motion';

interface PaymentDetailsFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  paymentMethod: PaymentFormData['paymentMethod'];
  phoneNumber?: string;
}

export const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({
  register,
  errors,
  paymentMethod,
  phoneNumber
}) => {
  const renderForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-medium text-brand-600">Card Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="cardNumber" className="text-sm font-medium">
                  Card Number
                  <span className="text-destructive ml-1">*</span>
                </label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  className={errors.cardNumber ? "border-destructive" : ""}
                  {...register('cardNumber', { 
                    required: 'Card number is required',
                    pattern: {
                      value: /^[0-9\s]{13,19}$/,
                      message: 'Please enter a valid card number'
                    }
                  })}
                />
                {errors.cardNumber && (
                  <p className="text-sm text-destructive">{errors.cardNumber.message as string}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="cardExpiry" className="text-sm font-medium">
                    Expiry Date
                    <span className="text-destructive ml-1">*</span>
                  </label>
                  <Input
                    id="cardExpiry"
                    placeholder="MM/YY"
                    className={errors.cardExpiry ? "border-destructive" : ""}
                    {...register('cardExpiry', { 
                      required: 'Expiry date is required',
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                        message: 'Format: MM/YY'
                      }
                    })}
                  />
                  {errors.cardExpiry && (
                    <p className="text-sm text-destructive">{errors.cardExpiry.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="cardCVV" className="text-sm font-medium">
                    CVV
                    <span className="text-destructive ml-1">*</span>
                  </label>
                  <Input
                    id="cardCVV"
                    placeholder="123"
                    className={errors.cardCVV ? "border-destructive" : ""}
                    {...register('cardCVV', { 
                      required: 'CVV is required',
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: 'Valid CVV required'
                      }
                    })}
                  />
                  {errors.cardCVV && (
                    <p className="text-sm text-destructive">{errors.cardCVV.message as string}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 'mpesa':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-medium text-brand-600">M-Pesa Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="mpesaNumber" className="text-sm font-medium">
                  M-Pesa Phone Number
                  <span className="text-destructive ml-1">*</span>
                </label>
                <div className="flex">
                  <div className="bg-muted flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md">
                    <span className="text-sm text-muted-foreground">+254</span>
                  </div>
                  <Input
                    id="mpesaNumber"
                    placeholder="712345678"
                    className={`rounded-l-none ${errors.mpesaNumber ? "border-destructive" : ""}`}
                    defaultValue={phoneNumber?.replace(/^0+/, '') || ''}
                    {...register('mpesaNumber', {
                      required: 'M-Pesa number is required',
                      pattern: {
                        value: /^[0-9]{9}$/,
                        message: 'Please enter a valid 9-digit number without leading zero'
                      }
                    })}
                  />
                </div>
                {errors.mpesaNumber && (
                  <p className="text-sm text-destructive">{errors.mpesaNumber.message as string}</p>
                )}
              </div>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                You will receive an M-Pesa prompt on this number to complete the payment.
              </p>
            </div>
          </motion.div>
        );
      
      case 'paypal':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-medium text-brand-600">PayPal Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="paypalEmail" className="text-sm font-medium">
                  PayPal Email
                  <span className="text-destructive ml-1">*</span>
                </label>
                <Input
                  id="paypalEmail"
                  type="email"
                  placeholder="your-email@example.com"
                  className={errors.paypalEmail ? "border-destructive" : ""}
                  {...register('paypalEmail', {
                    required: 'PayPal email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.paypalEmail && (
                  <p className="text-sm text-destructive">{errors.paypalEmail.message as string}</p>
                )}
              </div>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                You will be redirected to PayPal to complete your payment securely.
              </p>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mt-6 border-t pt-6">
      {renderForm()}
    </div>
  );
};