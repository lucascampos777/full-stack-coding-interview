'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });

    if(res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      router.push('/photos');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:justify-center mt-5 md:mt-0 items-center bg-white max-w-[320px] mx-auto">
      <div className="mb-5">
        <Image src="/logo.svg" alt="Clever Logo" width={75} height={75} />
      </div>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-8"
      >
        <h2 className="text-center text-xl font-semibold text-gray-900">
          Sign in to your account
        </h2>

        <div>
          <label className="block text-[14px] font-bold text-gray-700 mb-2">
            Username
          </label>
          <input
            type="email"
            placeholder="testing@testing.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 h-[45px] text-[16px] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-gray-700">Password</label>
            <span className="text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          <input
            type="password"
            placeholder="●●●●●●●"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0070F3] hover:bg-blue-600 hover:cursor-pointer text-white py-3 rounded-md font-bold"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
