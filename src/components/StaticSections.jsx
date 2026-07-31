import { useState } from 'react'
import { api } from '../services'

export function AboutSection() {
  const features = [
    { icon: '🌶️', title: 'Authentic Spices', desc: 'Hand-picked from Rajasthani farms, ground fresh each morning.' },
    { icon: '🤖', title: 'AI Food Assistant', desc: 'Chat in Hindi, English, or Hinglish to discover dishes and order.' },
    { icon: '🚀', title: 'Fast Delivery', desc: 'Hot, fresh food at your table or door in 25–30 minutes.' },
    { icon: '👨‍🍳', title: 'Master Chefs', desc: 'Decades of royal Rajasthani kitchen experience.' },
  ]
  return (
    <section id="about" className="py-24 px-6 border-t border-gold-400/10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="section-label mb-3">Our Story</p>
          <h2 className="display-heading text-ink-50 mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            A Legacy of Flavour<br />Since 2005
          </h2>
          <p className="text-ink-400 text-sm leading-loose mb-4">
            Spice Garden was born from a simple belief — that the finest food needs no pretension. Rooted in Jodhpur's culinary traditions, every recipe carries generations of craft.
          </p>
          <p className="text-ink-400 text-sm leading-loose">
            100% vegetarian, always — from fiery Laal Maas to delicate Continental risottos.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {features.map(f => (
            <div key={f.title} className="glass-card p-5 hover:border-gold-400/30 transition-colors">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-display text-ink-100 font-light mb-1.5">{f.title}</h3>
              <p className="text-ink-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BookTableSection() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2', note: '' })
  const [status, setStatus] = useState(null)
  const [aiSuggestion, setAiSuggestion] = useState('')

  function handleChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setTimeout(async () => {
      setStatus('success')
      try {
        const res = await api.post('/chat/', {
          messages: [{ role: 'user', content: `A group of ${form.guests} people is coming at ${form.time}. Suggest 2-3 must-try dishes in 2 sentences, enthusiastically.` }],
          session_id: 'booking_' + Date.now(),
        })
        setAiSuggestion(res.data.reply)
      } catch { setAiSuggestion('We look forward to serving you our finest dishes! 🍛') }
    }, 1200)
  }

  const timeSlots = ['12:00 PM', '1:00 PM', '2:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM']

  return (
    <section id="book-table" className="py-24 px-6 border-t border-gold-400/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Reservations</p>
          <h2 className="display-heading text-ink-50 mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Reserve Your Table</h2>
          <p className="text-ink-400 text-sm max-w-md mx-auto">Experience an unforgettable evening — our AI even suggests dishes for your group.</p>
        </div>

        {status === 'success' ? (
          <div className="glass-card p-8 text-center max-w-lg mx-auto">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-display text-2xl text-ink-50 mb-2">Table Reserved</h3>
            <p className="text-ink-400 text-sm mb-6">
              <strong className="text-gold-300">{form.name}</strong>, table for <strong className="text-gold-300">{form.guests}</strong> on <strong className="text-gold-300">{form.date}</strong> at <strong className="text-gold-300">{form.time}</strong> confirmed.
            </p>
            {aiSuggestion && (
              <div className="bg-gold-400/5 border border-gold-400/20 p-4 text-left">
                <p className="text-xs text-gold-400 font-medium mb-1">🤖 AI Recommendation:</p>
                <p className="text-ink-300 text-sm">{aiSuggestion}</p>
              </div>
            )}
            <button onClick={() => { setStatus(null); setForm({ name:'',phone:'',date:'',time:'',guests:'2',note:'' }); setAiSuggestion('') }}
              className="mt-6 btn-outline-gold text-sm">Book Another Table</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-ink-400 tracking-wide uppercase">Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Priya Sharma"
                className="bg-ink-800/50 border border-gold-400/20 px-4 py-2.5 text-sm text-ink-50 placeholder-ink-600 outline-none focus:border-gold-400/50" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-ink-400 tracking-wide uppercase">Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange} required type="tel" placeholder="+91 98765 43210"
                className="bg-ink-800/50 border border-gold-400/20 px-4 py-2.5 text-sm text-ink-50 placeholder-ink-600 outline-none focus:border-gold-400/50" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-ink-400 tracking-wide uppercase">Date *</label>
              <input name="date" value={form.date} onChange={handleChange} required type="date" min={new Date().toISOString().split('T')[0]}
                className="bg-ink-800/50 border border-gold-400/20 px-4 py-2.5 text-sm text-ink-50 outline-none focus:border-gold-400/50" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-ink-400 tracking-wide uppercase">Time *</label>
              <select name="time" value={form.time} onChange={handleChange} required
                className="bg-ink-800/50 border border-gold-400/20 px-4 py-2.5 text-sm text-ink-50 outline-none focus:border-gold-400/50">
                <option value="">Select time</option>
                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-ink-400 tracking-wide uppercase">Guests *</label>
              <select name="guests" value={form.guests} onChange={handleChange}
                className="bg-ink-800/50 border border-gold-400/20 px-4 py-2.5 text-sm text-ink-50 outline-none focus:border-gold-400/50">
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-ink-400 tracking-wide uppercase">Special Request</label>
              <input name="note" value={form.note} onChange={handleChange} placeholder="Anniversary, allergies..."
                className="bg-ink-800/50 border border-gold-400/20 px-4 py-2.5 text-sm text-ink-50 placeholder-ink-600 outline-none focus:border-gold-400/50" />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-3">
              <button type="submit" disabled={status==='loading'} className="w-full btn-gold disabled:opacity-50">
                {status === 'loading' ? 'Confirming...' : 'Confirm Reservation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-gold-400/10 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gold-400">✦</span>
            <span className="font-display text-lg text-ink-50 font-light tracking-widest">SPICE GARDEN</span>
          </div>
          <p className="text-ink-500 text-xs leading-relaxed max-w-xs">100% Pure Vegetarian cuisine. Jodhpur, since 2005.</p>
        </div>
        <div>
          <p className="section-label mb-4">Contact</p>
          <ul className="flex flex-col gap-2 text-ink-400 text-sm">
            <li>📍 Clock Tower, Jodhpur</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ hello@spicegarden.in</li>
          </ul>
        </div>
        <div>
          <p className="section-label mb-4">Hours</p>
          <ul className="flex flex-col gap-2 text-ink-400 text-sm">
            <li className="flex justify-between"><span>Mon–Fri</span><span className="text-ink-200">11am–11pm</span></li>
            <li className="flex justify-between"><span>Sat–Sun</span><span className="text-ink-200">10am–12am</span></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gold-400/10 text-center">
        <p className="text-ink-600 text-xs">© 2025 Spice Garden · 100% Pure Veg 🌿</p>
      </div>
    </footer>
  )
}
