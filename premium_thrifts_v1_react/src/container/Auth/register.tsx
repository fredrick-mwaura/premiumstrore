import React, {useState} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {toast} from 'react-toastify'
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { registerUser } from '../../reducers/actions/authActions'

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({

    "first_name": "",
    "last_name": "",
    "email": "",
    "password": "",
    "password_confirmation": ""
})

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser(formData);

      if (response?.status === true) {
        const name = response.user?.name || 'User';
        toast.success(`Welcome, ${name}!`);
        navigate('/profile');
      } else {
        toast.error(response?.message || 'Unexpected response from server');
      }

    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Registration failed. Please try again.';
      toast.error(message);
      console.error("Registration error:", message);
    } finally {
      setLoading(false);
    }
  };

    const continue_with_google = useGoogleLogin({
      onSuccess: (tokenResponse) => {
        dispatch(handleGoogleLogin(tokenResponse, navigate));
      },
      onError: () => {
        toast.error('Google popup closed or failed');
      },
      flow: 'implicit',
    });

  return (
    <div className="flex flex-col md:flex-row items-stretch min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Left Section - Branding */}
      <div className="md:w-1/2 hidden md:flex flex-col items-center justify-center p-8 md:p-12">
        <div className="max-w-md space-y-6 text-center md:text-left">
          <div className="mb-8">
            <img 
              src="/site-assets/register.svg" 
              alt="Brand Logo" 
              className="w-61 h-61 mb-6 mx-auto md:mx-0" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/112";
              }}
            />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Join our community</h1>
            <p className="mt-3 text-muted-foreground">
              Create an account to start your shopping journey
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-base md:text-lg font-medium">
              "You like it, you buy it. It's that simple."
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Sign up to start your shopping journey.
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground pt-8 mt-auto">
            © 2025 | All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-card">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={register} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      name="first_name"
                      onChange={handleChange}
                      value={formData.first_name}
                      type="text" 
                      placeholder="First name" 
                      className="pl-9" 
                      required 
                      autoCapitalize="true"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      name="last_name"
                      onChange={handleChange}
                      value={formData.last_name}
                      type="text" 
                      placeholder="Last name" 
                      className="pl-9" 
                      required 
                      autoCapitalize="true"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    type="email" 
                    placeholder="Email" 
                    className="pl-9" 
                    required 
                    autoCapitalize="true"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input     
                    name="password"             
                    onChange={handleChange} 
                    value={formData.password}
                    type="password" 
                    placeholder="Create Password" 
                    className="pl-9" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    name="password_confirmation"
                    onChange={handleChange}
                    value={formData.password_confirmation}
                    type="password" 
                    placeholder="Confirm Password" 
                    className="pl-9" 
                    required 
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <a href="/terms" className="text-primary underline hover:text-primary/90">
                    terms and conditions
                  </a>
                </label>
              </div>
              
              <Button type="submit" className="w-full">                
                {loading ? 'Registering...' : 'Create account'}
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full flex gap-2 items-center justify-center"
              onClick={()=>continue_with_google()}
            >
              <img 
                src="/site-assets/google.png" 
                alt="Google" 
                className="w-5 h-5"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/20";
                }}
              />
              <span>Google</span>
            </Button>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/sign-in" className="text-primary font-medium hover:underline">
                Log in
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
function handleGoogleLogin(tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">, navigate: NavigateFunction): any {
  throw new Error("Function not implemented.");
}
