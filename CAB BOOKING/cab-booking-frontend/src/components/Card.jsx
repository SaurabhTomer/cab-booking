import React from 'react'

export default function Card({ className = '', children }) {
  return <div className={`bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-6 ${className}`}>{children}</div>
}
