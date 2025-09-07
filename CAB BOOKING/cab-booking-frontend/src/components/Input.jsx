import React from 'react'

export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <input
        className={`w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </label>
  )
}
