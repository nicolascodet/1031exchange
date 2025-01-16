'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRightLeft, Lock, Mail, Building, User } from 'lucide-react';
import { authService } from '@/services/auth';
import { UserType } from '@/types/auth';

const AuthScreen = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<UserType>(UserType.Investor);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await authService.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        await authService.register({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          userType,
          companyName: userType === UserType.QI ? formData.companyName : undefined,
        });
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <ArrowRightLeft className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <p className="text-gray-500 mt-2">
            {isLogin 
              ? 'Sign in to manage your property exchanges' 
              : 'Get started with PropSwap'}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button 
                  type="button"
                  variant={userType === UserType.Investor ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => setUserType(UserType.Investor)}
                >
                  <User className="mr-2 h-4 w-4" />
                  Investor
                </Button>
                <Button
                  type="button"
                  variant={userType === UserType.QI ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => setUserType(UserType.QI)}
                >
                  <Building className="mr-2 h-4 w-4" />
                  Qualified Intermediary
                </Button>
              </div>
            )}
            
            {!isLogin && (
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {userType === UserType.QI && (
                  <div>
                    <Input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button 
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>

            <div className="text-center text-sm text-gray-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                className="text-blue-600 hover:text-blue-700"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen; 