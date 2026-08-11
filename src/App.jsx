import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { Routes, Route } from 'react-router-dom';
import Analytics from './pages/Analytics';
import SocialAccounts from './pages/SocialAccounts';
import FacebookCallback from './pages/FacebookCallback';
import InstagramCallback from './pages/InstagramCallback';
import ThreadsCallback from './pages/ThreadsCallback';

function App() {


  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log('Token:', token);
    console.log('User:', user);
  }, [])
  

  return (
    <Routes>
      <Route element={<AuthLayout />} >
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Route>

      <Route element={<DashboardLayout />} >
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/socialaccounts' element={<SocialAccounts />} />
      </Route>

      {/* Facebook OAuth callback routes (support both paths) */}
      <Route path='/facebook-callback' element={<FacebookCallback />} />
      <Route path='/auth/facebook/callback' element={<FacebookCallback />} />
      <Route path='/auth/instagram/callback' element={<InstagramCallback />} />
      <Route path='/auth/threads/callback' element={<ThreadsCallback />} />
    </Routes>
  )
}

export default App
