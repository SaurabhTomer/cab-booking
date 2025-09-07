import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'

const Home = () => {
  return (
    <main className="bg-light min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100/70 border-b border-primary-100">
        <div className="container py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-primary-700 font-semibold mb-2">Your ride, now.</p>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-dark mb-4 leading-tight">
                Book rides fast with real-time tracking
              </h1>
              <p className="text-slate-600 mb-6 max-w-prose">
                Reliable rides for passengers and an effortless dashboard for drivers. Clear pricing, live tracking, and a modern experience.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/signup"><Button className="shadow-soft">Get Started</Button></Link>
                <Link to="/login"><Button variant="secondary">Login</Button></Link>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-slate-600">
                <span>• No hidden fees</span>
                <span>• Verified drivers</span>
                <span>• 24/7 support</span>
              </div>
            </div>
            <Card className="bg-white">
              <div className="aspect-video rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
                Map / Illustration
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-12">
        <h2 className="text-2xl font-semibold mb-6">Why choose us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Fast Booking', desc: 'Find and book rides in seconds.', icon: '⚡' },
            { title: 'Live Tracking', desc: 'Track your driver in real-time.', icon: '🛰️' },
            { title: 'Verified Drivers', desc: 'Safety comes first.', icon: '🛡️' },
            { title: 'Affordable', desc: 'Transparent and fair pricing.', icon: '💸' },
          ].map((f) => (
            <Card key={f.title}>
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-slate-100">
        <div className="container py-12">
          <h2 className="text-2xl font-semibold mb-6">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              step: '1', title: 'Sign up', desc: 'Create an account as a rider or driver in seconds.'
            }, {
              step: '2', title: 'Find or add a ride', desc: 'Riders browse rides; drivers add routes and set prices.'
            }, {
              step: '3', title: 'Track live', desc: 'Get live location updates until your ride completes.'
            }].map((s) => (
              <Card key={s.step}>
                <div className="text-primary-600 font-bold mb-1">Step {s.step}</div>
                <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-12">
        <h2 className="text-2xl font-semibold mb-6">What riders say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{
            quote: 'Super quick to book and the tracking is spot on!', name: 'Ayesha'
          }, {
            quote: 'As a driver, adding rides is easy and I love the clean UI.', name: 'Rahul'
          }, {
            quote: 'Transparent pricing and reliable drivers. Highly recommend.', name: 'Mia'
          }].map((t, i) => (
            <Card key={i}>
              <p className="text-slate-700">“{t.quote}”</p>
              <div className="mt-3 text-sm text-slate-500">— {t.name}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold">Ready to ride smarter?</h3>
            <p className="text-white/90">Join now and experience modern cab booking.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/signup"><Button variant="secondary">Create account</Button></Link>
            <Link to="/login"><Button>Login</Button></Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
