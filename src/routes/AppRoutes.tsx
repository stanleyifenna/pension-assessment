// src/routes/AppRoutes.tsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from "../pages/login/LoginPage";
import { ForgotPasswordPage } from "../pages/password-reset/ForgotPassword";
import { ResetPasswordPage } from "../pages/password-reset/ResetPassword";
import SignUpPage from "../pages/signup/SignUpPage";
import NotFound from "../pages/not-found/NotFound";

//ADMIN
import AdminHomePage from "../pages/admin/AdminHomePage";

//MEMBERS
import MemberHomePage from "../pages/member/MemberHomePage";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isAdmin, isMember } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      {/* <Route path="/login" element={
        isAuthenticated ? <Navigate to="" replace /> : <LoginPage />
      } /> */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes for any authenticated user */}
      <Route path="/dashboard/member" element={
        <ProtectedRoute>
          <MemberHomePage />
        </ProtectedRoute>
      } />
      
      {/* Admin-only routes */}
      <Route path="/dashboard/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AdminHomePage />
        </ProtectedRoute>
      } />
      
      {/* Member-only routes */}
      <Route path="/dashboard/member" element={
        <ProtectedRoute requiredRole="member">
          <MemberHomePage />
        </ProtectedRoute>
      } />
      
      {/* Error and redirect routes */}
      <Route path="*" element={<NotFound />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/password/reset/:email?/:token?" element={<ResetPasswordPage />} />
      <Route path="/password/forgot" element={<ForgotPasswordPage />} />
      
      {/* Home redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;