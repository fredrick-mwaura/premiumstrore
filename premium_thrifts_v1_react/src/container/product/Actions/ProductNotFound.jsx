import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          We're sorry, but the product you are looking for does not exist or has been removed.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Button 
            variant="outline" 
            onClick={handleGoBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Go Back</span>
          </Button>
          
          <Button 
            onClick={handleGoHome}
            className="flex items-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductNotFound;