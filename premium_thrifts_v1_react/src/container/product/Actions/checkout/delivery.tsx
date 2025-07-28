import React from 'react';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Truck } from 'lucide-react';
import type { DeliveryFormData } from '../Checkout';
import { 
  UseFormRegister,
  FieldErrors
} from 'react-hook-form';

interface DeliveryFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<DeliveryFormData>;
  onContinue: () => void;
}

export const DeliveryForm: React.FC<DeliveryFormProps> = ({ 
  register, 
  errors, 
  onContinue 
}) => {
  return (
    <>
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-xl text-brand-600 flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Delivery Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
              First Name
              <span className="text-destructive ml-1">*</span>
            </label>
            <Input
              id="firstName"
              placeholder="John"
              className={errors.firstName ? "border-destructive" : ""}
              {...register('firstName', { required: 'First name is required' })}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last Name
              <span className="text-destructive ml-1">*</span>
            </label>
            <Input
              id="lastName"
              placeholder="Doe"
              className={errors.lastName ? "border-destructive" : ""}
              {...register('lastName', { required: 'Last name is required' })}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Delivery Location
            <span className="text-destructive ml-1">*</span>
          </label>
          <Input
            id="location"
            placeholder="Your area or neighborhood"
            className={errors.location ? "border-destructive" : ""}
            {...register('location', { required: 'Delivery location is required' })}
          />
          {errors.location && (
            <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="apartmentName" className="text-sm font-medium">
              Apartment Name (Optional)
            </label>
            <Input
              id="apartmentName"
              placeholder="Sunrise Apartments"
              {...register('apartmentName')}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="houseNumber" className="text-sm font-medium">
              House/Unit Number (Optional)
            </label>
            <Input
              id="houseNumber"
              placeholder="A4"
              {...register('houseNumber')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number
              <span className="text-destructive ml-1">*</span>
            </label>
            <div className="flex">
              <div className="bg-muted flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md">
                <span className="text-sm text-muted-foreground">+254</span>
              </div>
              <Input
                id="phoneNumber"
                placeholder="712345678"
                className={`rounded-l-none ${errors.phoneNumber ? "border-destructive" : ""}`}
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{9}$/,
                    message: 'Please enter a valid 9-digit number without leading zero'
                  }
                })}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-sm text-destructive mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
              <span className="text-destructive ml-1">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              className={errors.email ? "border-destructive" : ""}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <Button 
          onClick={onContinue} 
          className="w-full py-6 mt-4 bg-brand-600 hover:bg-brand-700 text-lg font-medium transition-all duration-200 hover:scale-[1.01] bg-orange-400"
        >
          Continue to Payment
        </Button>
      </CardContent>
    </>
  );
};