import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-lg font-semibold text-slate-900 mb-2">CabBookingApp</div>
          <p className="text-sm text-slate-600">Book rides fast with real-time tracking.</p>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-2">Product</div>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>Features</li>
            <li>How it works</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-2">Company</div>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>About</li>
            <li>Contact</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-2">Legal</div>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="container py-4 text-sm text-slate-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} CabBookingApp</span>
          <span className="text-slate-400">Built with ❤️</span>
        </div>
      </div>
    </footer>
  )
}
