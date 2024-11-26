'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';
import { loginUser } from '@/app/redux/slice/authSlice';
import { RootState, AppDispatch } from '@/app/redux/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import footerLogo from '@/assets/image/footerLogo.png';
import bgImage2 from '@/assets/image/bg-image2.png';
import bgImage1 from '@/assets/image/bg-image1.png';

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <div>
      <Image src={bgImage2} alt="bgImage2" className="absolute float-end mt-[140px] lg:block hidden" />
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md ">
          <div className="flex flex-col items-center ">
            <div className="flex font-bold flex-col items-center md:items-start">
              <Image src={footerLogo} alt="Byrnecut Logo" className="pb-1" />
              <div className="text-center text-[13px] md:text-left leading-3">
                <p className="font-semibold">BYRNECUT</p>
                <p className="text-[9px]">BURKINA FASO</p>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            </div>
          </div>
          <form   className="space-y-6" onSubmit={handleSubmit}>
          
            <div className="space-y-2 ">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="test@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-400 rounded-md outline-0 focus:border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative border border-gray-400 rounded-md ">
                <Input
                  id="password"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                </Button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-600">Don&apos;t have an account?</p>
              <Link href="/register">
                <Button variant="outline" className="mt-2 w-full text-white bg-black">
                  Register
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Image src={bgImage1} alt="bgImage1" className="relative float-end mt-[-1000px] lg:block hidden" />
    </div>
  );
}
