import { useState } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { apiBase } from '../lib/apiBase';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });


      const data = await response.json();

      if (data.success) {
        alert('Login successful!');
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop font-sans antialiased selection:bg-primary-container selection:text-white">
      <main className="w-full max-w-[440px] relative z-10">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary-container/10 to-tertiary/5 blur-3xl rounded-full opacity-50 z-[-1] pointer-events-none" />
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 md:p-10 flex flex-col gap-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
          <header className="flex flex-col items-center text-center gap-2">
            <div className="flex items-center gap-2 text-primary font-bold font-headline-md text-headline-md mb-2">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
              <span>AI Manager</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Welcome Back</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Access your autonomous social workspace</p>
          </header>

          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg bg-surface border border-outline-variant hover:bg-surface-container-high transition-all duration-200 font-label-md text-label-md text-on-surface">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
              Continue with Google
            </button>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-outline-variant" />
            <span className="flex-shrink-0 mx-4 font-body-sm text-body-sm text-on-surface-variant">Or continue with email</span>
            <div className="flex-grow border-t border-outline-variant" />
          </div>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">mail</span>
                <input className="w-full bg-surface border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-on-surface font-body-md placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-4 focus:ring-primary-container input-glow transition-all duration-200" id="email" name="email" placeholder="name@company.com" required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
                <a className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors" href="#">Forgot password?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">lock</span>
                <input className="w-full bg-surface border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-on-surface font-body-md placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-4 focus:ring-primary-container input-glow transition-all duration-200" id="password" name="password" placeholder="••••••••" required
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <input className="w-4 h-4 rounded bg-surface border-outline-variant text-primary-container focus:ring-primary-container focus:ring-offset-background" id="remember" name="remember" type="checkbox" />
              <label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Remember me</label>
            </div>

            <button onClick={handleSubmit} className="mt-2 w-full bg-primary-container text-white font-label-md text-label-md py-3 rounded-lg hover:bg-inverse-primary transition-all duration-300 btn-glow relative overflow-hidden group" type="submit">
              <span className="relative z-10 flex items-center justify-center gap-2">Sign In <span className="material-symbols-outlined text-[18px]">arrow_forward</span></span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>

          <div className="text-center mt-2">
            <p className="font-body-sm text-body-sm text-on-surface-variant">Don't have an account? <NavLink to="/signup" className="text-primary font-medium hover:text-primary-container transition-colors ml-1">Create One</NavLink></p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
