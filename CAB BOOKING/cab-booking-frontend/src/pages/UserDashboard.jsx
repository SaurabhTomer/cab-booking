import React, { useEffect, useState } from 'react'
import RideCard from '../components/RideCard'
import LiveMap from '../components/LiveMap'
import Card from '../components/Card'

const UserDashboard = () => {
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    const getRides = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/user/rides', {
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

  const handleBook = async (ride) => {
    try {
      const res = await fetch('/api/user/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rideId: ride._id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')
      alert(data.message)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <main className="container py-8 space-y-6">
      <h2 className="text-2xl font-semibold">User Dashboard</h2>

      <Card>
        {loading && <div>Loading rides...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && rides.length === 0 && (
          <div className="text-gray-600">No rides available right now.</div>
        )}
        {!loading && !error && rides.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rides.map((ride) => (
              <RideCard key={ride._id} ride={ride} onBook={handleBook} />)
            )}
          </div>
        )}
      </Card>

      {rides[0] && (
        <Card>
          <h3 className="text-lg font-semibold mb-3">Live Tracking Example</h3>
          <LiveMap rideId={rides[0]._id} />
        </Card>
      )}
    </main>
  )
}

export default UserDashboard
