import React, { useState, useEffect } from 'react'
import AddRideForm from '../components/AddRideFrom'
import Card from '../components/Card'

const DriverDashboard = () => {
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const token = localStorage.getItem('token')

  // Fetch driver rides
  useEffect(() => {
    const getRides = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/driver/my-rides', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to load rides')
        setRides(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    getRides()
  }, [token])

  // Add new ride
  const handleAddRide = async (ride) => {
    try {
      const res = await fetch('/api/driver/add-ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ride),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to add ride')
      setRides((prev) => [...prev, data.ride])
      alert(data.message)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <main className="container py-8 space-y-6">
      <h2 className="text-2xl font-semibold">Driver Dashboard</h2>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Add a Ride</h3>
        <AddRideForm onAddRide={handleAddRide} />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">My Rides</h3>
        {loading && <div>Loading rides...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && rides.length === 0 && (
          <div className="text-gray-600">You have not added any rides yet.</div>
        )}
        {!loading && !error && rides.length > 0 && (
          <ul className="divide-y divide-gray-200">
            {rides.map((r, idx) => (
              <li key={idx} className="py-3 flex items-center justify-between">
                <span className="text-slate-800 font-medium">{r.source} → {r.destination}</span>
                <span className="text-slate-600">${r.price}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </main>
  )
}

export default DriverDashboard
