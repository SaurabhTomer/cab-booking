import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthed, getRole } from '../lib/auth'

export default function ProtectedRoute({ children, role }) {
  if (!isAuthed()) return <Navigate to="/login" replace />
  if (role && getRole() !== role) return <Navigate to="/" replace />
  return children
}
