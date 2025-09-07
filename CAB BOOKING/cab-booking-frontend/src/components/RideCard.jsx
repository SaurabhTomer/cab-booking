import React from 'react'
import Card from './Card'
import Button from './Button'

// Displays ride info and allows booking
const RideCard = ({ ride, onBook }) => {
  return (
    <Card className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-slate-900">{ride.source} → {ride.destination}</h3>
      <div className="text-slate-600 text-sm">Price: <span className="font-medium text-slate-800">${ride.price}</span></div>
      <div className="text-slate-600 text-sm">Seats Available: <span className="font-medium text-slate-800">{ride.availableSeats}</span></div>
      <div className="pt-2">
        <Button onClick={() => onBook(ride)} className="w-full sm:w-auto">Book Ride</Button>
      </div>
    </Card>
  )
}

export default RideCard
