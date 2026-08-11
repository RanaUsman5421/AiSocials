import {useState} from 'react'
import React from 'react'
import { NavLink } from 'react-router-dom';
import { apiBase } from '../lib/apiBase';

const Signup = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmint = async (e) => {
        e.preventDefault();
        
        if(formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(`${apiBase}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            })

            const data = await response.json();

            console.log(data);

            if(data.success) {
                alert("Signup successful!");
            }
            else {
                alert("Signup failed: " + data.message);
            }
        }
        catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup." + error.message);
        }
    }

  return (
    <div className=" font-body-md min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-container/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-tertiary/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md mx-margin-mobile md:mx-auto relative z-10">
        <div className="bg-surface rounded-xl p-8 md:p-10 flex flex-col gap-8 shadow-[0_8px_32px_rgba(17,28,45,0.06)] border border-outline-variant/30">
          <div className="text-center flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[32px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                hub
              </span>
              <h1 className="font-headline-md text-headline-md text-on-surface">AI Manager</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                Create Your Account
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Join the future of social management.</p>
            </div>
          </div>

          <form className="flex flex-col gap-2" onSubmit={(event) => event.preventDefault()}>
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="workspace-name">
                Your Name
              </label>
              <div className="relative focus-within:text-primary">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>
                  person
                </span>
                <input
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline/70 font-body-md text-body-md shadow-sm"
                  id="workspace-name"
                  placeholder="e.g. John Doe"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="work-email">
                Work Email
              </label>
              <div className="relative focus-within:text-primary">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>
                  mail
                </span>
                <input
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline/70 font-body-md text-body-md shadow-sm"
                  id="work-email"
                  placeholder="name@company.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">
                Password
              </label>
              <div className="relative focus-within:text-primary">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>
                  lock
                </span>
                <input
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline/70 font-body-md text-body-md shadow-sm"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-1 mt-1">
                <div className="h-1 flex-1 bg-surface-variant rounded-full" />
                <div className="h-1 flex-1 bg-surface-variant rounded-full" />
                <div className="h-1 flex-1 bg-surface-variant rounded-full" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="relative focus-within:text-primary">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>
                  lock_reset
                </span>
                <input
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline/70 font-body-md text-body-md shadow-sm"
                  id="confirm-password"
                  placeholder="••••••••"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-1">
              <button
                className="border border-blue-500 px-5 py-3 rounded-lg bg-blue-500 text-white font-label-md text-label-md hover:bg-blue-600 transition-colors"
                type="submit"
                onClick={handleSubmint}
              >
                Submit
              </button>

              <div className="flex items-center gap-4">
                <div className="h-px bg-surface-variant flex-1" />
                <span className="font-label-sm text-label-sm text-outline uppercase">or</span>
                <div className="h-px bg-surface-variant flex-1" />
              </div>

              <button
                className="w-full bg-surface hover:bg-surface-container-low text-on-surface font-label-md text-label-md py-3 px-4 rounded-lg transition-colors border border-outline-variant flex justify-center items-center gap-2"
                type="button"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign up with Google
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center gap-6 text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[80%]">
              By signing up, you agree to our{' '}
              <a className="text-tertiary hover:underline " href="#">
                Terms of Service
              </a>{' '}
              and{' '}
              <a className="text-tertiary hover:underline" href="#">
                Privacy Policy
              </a>
              .
            </p>
            <p className="font-body-sm text-body-sm text-on-surface">
              Already have an account?{' '}
              <NavLink to="/login" className="text-primary hover:text-primary-container hover:underline font-label-md hover:text-underline transition-colors">
                Sign In
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
