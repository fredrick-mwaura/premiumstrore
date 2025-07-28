// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { CardContent } from '@/components/ui/card';
// import { DeliveryFormData } from './Checkout';
// import { FieldErrors, UseFormRegister } from 'react-hook-form';

// type DeliveryFormProps = {
//   register: UseFormRegister<DeliveryFormData>;
//   errors: FieldErrors<DeliveryFormData>;
//   onContinue: () => void;
// };

// export const DeliveryForm: React.FC<DeliveryFormProps> = ({ 
//   register, 
//   errors, 
//   onContinue 
// }) => {
//   return (
//     <CardContent className="p-6">
//       <form className="space-y-6">
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
//             <Input 
//               {...register('firstName', { required: 'First name is required' })} 
//               placeholder="First name" 
//               className="w-full"
//             />
//             {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
//             <Input 
//               {...register('lastName', { required: 'Last name is required' })} 
//               placeholder="Last name" 
//               className="w-full"
//             />
//             {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Your Location</label>
//           <Input 
//             {...register('location', { required: 'Location is required' })} 
//             placeholder="Enter your location" 
//             className="w-full"
//           />
//           {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Apartment Name</label>
//             <Input 
//               {...register('apartmentName')} 
//               placeholder="Apartment name" 
//               className="w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">House Number</label>
//             <Input 
//               {...register('houseNumber')} 
//               placeholder="House number" 
//               className="w-full"
//             />
//           </div>
//         </div>

//         <div className="grid md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Country Code</label>
//             <Select defaultValue="+254" {...register('countryCode')}>
//               <SelectTrigger>
//                 <SelectValue placeholder="+254" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="+254">+254</SelectItem>
//                 <SelectItem value="+1">+1</SelectItem>
//                 <SelectItem value="+44">+44</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//             <Input
//               {...register('phoneNumber', { 
//                 required: 'Phone number is required',
//                 pattern: {
//                   value: /^[0-9]{9,10}$/,
//                   message: 'Please enter a valid phone number'
//                 }
//               })}
//               placeholder="Enter your number"
//               className="w-full"
//             />
//             {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
//           </div>
//         </div>

//         <Button 
//           type="button" 
//           onClick={onContinue} 
//           className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
//         >
//           Continue to Payment
//         </Button>
//       </form>
//     </CardContent>
//   );
// };