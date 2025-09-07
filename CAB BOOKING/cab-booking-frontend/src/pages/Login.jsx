import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        navigate(data.role === 'driver' ? '/driver' : '/user')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container py-10">
      <div className="max-w-md mx-auto">
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          {error && <div className="mb-3 text-red-600">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label className="block space-y-1">
              <span className="text-sm font-medium text-gray-700">Role</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              >
                <option value="user">User</option>
                <option value="driver">Driver</option>
              </select>
            </label>
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Logging in...' : 'Login'}</Button>
          </form>
        </Card>
      </div>
    </main>
  )
}

export default Login
