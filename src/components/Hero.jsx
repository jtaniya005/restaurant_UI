import { ArrowDown } from 'lucide-react'
import heroBg from '../assets/hero-bg.png'

// ── Inline Booking Bar (like reference image) ─────────────────────────────────
function InlineBookingBar({ onOpenFullForm }) {
  return (
    <div className="relative z-10 mt-14 w-full max-w-3xl mx-auto">
      <div className="glass-card rounded-none border border-gold-400/20 p-4 flex flex-col sm:flex-row items-stretch gap-3">
        <input type="date" min={new Date().toISOString().split('T')[0]}
          className="flex-1 bg-ink-800/50 border border-gold-400/15 px-4 py-2.5 text-sm text-ink-100 outline-none focus:border-gold-400/50" />
        <select className="flex-1 bg-ink-800/50 border border-gold-400/15 px-4 py-2.5 text-sm text-ink-100 outline-none focus:border-gold-400/50">
          <option>Select Time</option>
          {['12:00 PM', '1:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'].map(t => <option key={t}>{t}</option>)}
        </select>
        <select className="flex-1 bg-ink-800/50 border border-gold-400/15 px-4 py-2.5 text-sm text-ink-100 outline-none focus:border-gold-400/50">
          {[2, 3, 4, 5, 6].map(n => <option key={n}>{n} Guests</option>)}
        </select>
        <button onClick={onOpenFullForm} className="btn-gold whitespace-nowrap">Reserve Now</button>
      </div>
    </div>
  )
}

export default function Hero({ onChatOpen }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background image placeholder — replace with your own hero food photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/80 to-ink-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto animate-fade-up">
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="h-px w-12 bg-gold-400/50" />
          <span className="section-label">Jodhpur · Est. 2005 · 100% Pure Veg</span>
          <div className="h-px w-12 bg-gold-400/50" />
        </div>

        <h1 className="display-heading text-ink-50 mb-6 drop-shadow-xl" style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}>
          Welcome to a<br />
          <em className="not-italic text-gold-300">Fine Dining Experience</em>
        </h1>

        <p className="text-ink-300 text-lg font-light max-w-xl mx-auto leading-relaxed mb-8 drop-shadow-md">
          Savour the flavours of royal Rajasthani vegetarian cuisine, crafted with generations of tradition in an elegant, modern ambiance.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <a href="#book-table" className="btn-gold">Book a Table</a>
          <button onClick={onChatOpen} className="btn-outline-gold">💬 Chat & Order with AI</button>
        </div>
      </div>

      {/* Inline reservation bar */}
      <InlineBookingBar onOpenFullForm={() => document.getElementById('book-table')?.scrollIntoView({ behavior: 'smooth' })} />

      <a href="#menu" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-400/50 hover:text-gold-400 transition-colors animate-shimmer">
        <ArrowDown size={18} />
      </a>
    </section>
  )
}
