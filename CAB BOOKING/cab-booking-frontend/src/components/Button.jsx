import React from 'react'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'bg-transparent text-primary-700 hover:bg-primary-50 focus:ring-primary-500',
  }
  return (
    <button className={`${base} ${variants[variant]} px-4 py-2 ${className}`} {...props}>
      {children}
    </button>
  )
}
