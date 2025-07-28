export interface Product {
  name: string;
  price: number;
  quantity: number;
  total: number;
  details: {
    gender?: string;
    color: string;

    size: string;
  };
}

export interface ShippingActivity {
  status: string;
  time: string;
  date: string;
  trackingNumber?: string;
}

export interface OrderDetailsProps {
  orderId: string;
  status: {
    paid: boolean;
    fulfilled: boolean;
    date: string;
  };
  products: Product[];
  customer: {
    name: string;
    email: string;
    phone: string;
    orders: number;
    avatar: string;
  };
  shipping: {
    address: {
      street: string;
      city: string;
      country: string;
      postalCode: string;
    };
    activity: ShippingActivity[];
  };
  payment: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    method: {
      type: string;
      cardNumber: string;
    };
  };
}

export interface OrderDetailsProps {
  onBack?: () => void; 
}

export interface PaymentMethod {
  type: 'Mpesa' | 'paypal';
  value: string;
}

export interface Order {
  id: string;
  product: {
    name: string;
    image: string;
  };
  customerName: string;
  price: number;
  quantity: number;
  payment: number;
  status: 'Success' | 'Pending' | 'Cancel';
  tracking: string;
  paymentMethod: PaymentMethod;
}