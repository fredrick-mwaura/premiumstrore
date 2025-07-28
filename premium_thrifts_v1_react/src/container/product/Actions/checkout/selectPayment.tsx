import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Banknote } from 'lucide-react';
import type { PaymentFormData } from '../Checkout';

interface PaymentMethodSelectionProps {
  selectedPaymentMethod: PaymentFormData['paymentMethod'] | null;
  onSelectPaymentMethod: (method: PaymentFormData['paymentMethod']) => void;
}

export const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({
  selectedPaymentMethod,
  onSelectPaymentMethod,
}) => {
  const paymentOptions = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: <img src="/images/mpesa.png" 
                alt="M-Pesa" className="w-8 h-8 object-contain" />,
      description: 'Pay directly with your M-Pesa mobile money',
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Pay with Mastercard, Visa or other cards',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <img src="/images/paypal.png" 
                alt="PayPal" className="w-8 h-8 object-contain" />,
      description: 'Pay with your PayPal account',
    },
  ] as const;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">Select a payment method</h3>
      <div className="space-y-3">
        {paymentOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.01 }}
            className={`
              flex items-center border rounded-lg p-4 cursor-pointer transition-all
              ${selectedPaymentMethod === option.id 
                ? 'border-brand-600 ring-1 ring-brand-600 shadow-sm bg-brand-50/50' 
                : 'border-border hover:border-brand-300'}
            `}
            onClick={() => onSelectPaymentMethod(option.id as PaymentFormData['paymentMethod'])}
          >
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted mr-4">
              {option.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{option.name}</h3>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
            <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center ml-2">
              {selectedPaymentMethod === option.id && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-3 w-3 rounded-full bg-brand-600" 
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};