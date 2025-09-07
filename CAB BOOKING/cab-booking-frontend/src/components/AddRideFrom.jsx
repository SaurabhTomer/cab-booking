import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

// Form for drivers to add new rides
const AddRideForm = ({ onAddRide }) => {
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [price, setPrice] = useState("");
    const [seats, setSeats] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddRide({ source, destination, price, availableSeats: seats });
        setSource(""); setDestination(""); setPrice(""); setSeats("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
                <Input label="Source" value={source} onChange={e => setSource(e.target.value)} required />
                <Input label="Destination" value={destination} onChange={e => setDestination(e.target.value)} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
                <Input label="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                <Input label="Seats" type="number" value={seats} onChange={e => setSeats(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full sm:w-auto">Add Ride</Button>
        </form>
    );
};

export default AddRideForm;
