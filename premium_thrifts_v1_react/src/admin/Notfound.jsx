import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/admin');
  };

  return (
    <div className='md:flex justify-center'>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden p-6">

        <div className="relative z-10 text-center space-y-12 px-6 max-w-3xl mx-auto">
          {/* 404 Text */}
          <div className="py-8">
            <h2 className="text-4xl font-black text-primary animate-bounce">404</h2>
          </div>

          <div className="flex justify-center py-4">
            <AlertCircle className="w-20 h-20 text-primary animate-pulse" />
          </div>

          <div className="space-y-6 py-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Oops! Page Not Found
            </h2>
            <p className="text-muted-foreground text-xl max-w-lg mx-auto leading-relaxed">
              The page you're looking for seems to have wandered off into the digital void.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center py-6">
            <Button
              onClick={() => navigate(-1)}
              size="lg"
              className="group transition-all hover:shadow-lg hover:shadow-primary/20 text-lg px-8 py-6"
              aria-label="Go back"
            >
              <ArrowLeft className="mr-3 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Go Back
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={goHome}
              className="group transition-all hover:shadow-lg hover:border-primary/50 text-lg px-8 py-6"
              aria-label="Return home"
            >
              <Home className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
              Return Home
            </Button>
          </div>

          <p className="text-base text-muted-foreground pt-8 pb-4 animate-pulse">
            Lost? Don't worry, we'll help you find your way back.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </div>
  );
}