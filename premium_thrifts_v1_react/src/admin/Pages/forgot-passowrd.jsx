import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import PasswordResetEmail from '../../container/Auth/emails/resetpassword';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/forgotPassword', { email });
      if (res.data.success) {
        const {otp, url, text} = res.data;
        setStep(2);
        return <PasswordResetEmail subject={text} otp={otp} url={url}/>
      } else {
        setError('Failed to send verification code. Please try again.');
      }
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');

    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    try {
      // Simulated success for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(3);
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/resetPassword', { email, code, password });
      if (res.data.success) {
        setStep(4);
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSubmitEmail} className='bg-background'>
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>Enter your email to reset your password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 w-full p-3 border rounded-md bg-background"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-500 p-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </CardContent>
          </form>
        );

      case 2:
        return (
          <form onSubmit={handleVerifyCode}>
            <CardHeader>
              <CardTitle>Verify Code</CardTitle>
              <CardDescription>Enter the 6-digit code sent to {email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="w-full p-3 border rounded-md text-center text-2xl tracking-widest bg-background"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  disabled={loading}
                />
                {error && (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-500 p-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-gray-500 p-3 rounded-md"
                >
                  Back to Email
                </button>
              </div>
            </CardContent>
          </form>
        );

      case 3:
        return (
          <form onSubmit={handleResetPassword}>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>Enter your new password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="New password"
                    className="pl-10 w-full p-3 border rounded-md bg-background"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="pl-10 w-full p-3 border rounded-md bg-background"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-500 p-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </CardContent>
          </form>
        );

      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle>Password Reset Successfully</CardTitle>
              <CardDescription>You can now login with your new password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <button
                  onClick={() => window.location.href = '/admin/login'}
                  className="w-full bg-blue-500 p-3 rounded-md hover:bg-blue-600"
                >
                  Return to Login
                </button>
              </div>
            </CardContent>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-50 p-4">
      <Card className="w-full max-w-md">
        {renderStep()}
      </Card>
    </div>
  );
};

export default ForgotPassword;