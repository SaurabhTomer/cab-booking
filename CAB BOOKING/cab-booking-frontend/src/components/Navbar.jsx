import React, { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const navigate = useNavigate()

  const links = useMemo(() => {
    if (!token) return [{ to: '/', label: 'Home' }]
    if (role === 'driver') return [{ to: '/', label: 'Home' }, { to: '/driver', label: 'Driver Dashboard' }]
    return [{ to: '/', label: 'Home' }, { to: '/user', label: 'User Dashboard' }]
  }, [token, role])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }

  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 text-white shadow-md bg-gradient-to-r from-primary-600 to-primary-700">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent"></span>
          CabBookingApp
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`transition-colors hover:text-primary-100 ${isActive(l.to) ? 'underline underline-offset-4 decoration-white/70' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          {!token ? (
            <div className="flex items-center gap-3">
              <Link to="/login"><Button variant="secondary" className="!py-1.5">Login</Button></Link>
              <Link to="/signup"><Button className="!py-1.5">Sign Up</Button></Link>
            </div>
          ) : (
            <Button variant="secondary" onClick={handleLogout} className="!py-1.5">Logout</Button>
          )}
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-primary-700">
          <div className="container py-3 space-y-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="block py-2" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            {!token ? (
              <div className="pt-2 flex gap-3">
                <Link to="/login" onClick={() => setOpen(false)}><Button variant="secondary" className="w-full">Login</Button></Link>
                <Link to="/signup" onClick={() => setOpen(false)}><Button className="w-full">Sign Up</Button></Link>
              </div>
            ) : (
              <Button variant="secondary" onClick={handleLogout} className="w-full">Logout</Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
