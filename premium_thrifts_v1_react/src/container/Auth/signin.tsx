import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {loginUser} from '../../reducers/actions/authActions'
import { useDispatch } from 'react-redux';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  function handleGoogleLogin(tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">, navigate: NavigateFunction): any {
    throw new Error(" ");
  }


  // Handle Submitf
  
const Login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      localStorage.removeItem('user');
      const response = await axios.post('http://localhost:8000/api/login', formData);

      // const { access_token, user} = response.data;

      // const user0 = user.slice(0, ' ')

      localStorage.setItem('user', JSON.stringify(response.data.user));

      const userData = localStorage.getItem('user');

      if (userData != 'undefined') {
        const user = JSON.parse(userData); 
        const fullName = user.name?.trim() || '';
        const firstName = fullName ? fullName.split(' ')[0] : " to Premium Hub"; 

        console.log(firstName); 

        toast.success(`Welcome back ${firstName}`);       
      }

      navigate('/profile');
    } catch (error) {
      const message = error?.response?.message || 'Login failed';
      toast.error(message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Continue with Google
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
      <div className="w-full md:w-1/2 hidden md:flex flex-col items-center justify-center p-8 md:p-12">
        <div className="max-w-md space-y-6 text-center md:text-left">
          <div className="mb-8">
            <img 
              src="/site-assets/login.svg" 
              alt="Brand Logo" 
              className="w-61 h-61 mb-6 mx-auto md:mx-0" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/112";
              }}
            />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-3 text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-base md:text-lg font-medium">
              "You like it, you buy it. It's that simple."
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to continue your shopping journey.
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground pt-8 mt-auto">
            © 2025 | All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-card">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">Sign in</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={Login} className="space-y-4" method="post">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id='email'
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="pl-9"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <a href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button type="submit" className="w-full">{loading? 'validating': 'login in'}</Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full flex gap-2 items-center justify-center" onClick={() => continue_with_google()}>
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
              Don't have an account?{" "}
              <a href="/register" className="text-primary font-medium hover:underline">
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}