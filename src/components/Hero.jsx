import { ArrowDown } from 'lucide-react'

export default function Hero({ onChatOpen }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #B8622E 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #D4855A 0%, transparent 70%)' }}
        />
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#F7F5F2" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto animate-fade-up">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="h-px w-12 bg-ember-500/60" />
          <span className="section-label">Jodhpur, Rajasthan · Est. 2005</span>
          <div className="h-px w-12 bg-ember-500/60" />
        </div>

        {/* Headline */}
        <h1 className="display-heading text-ink-50 mb-6" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}>
          Where Spice<br />
          <em className="text-ember-400 not-italic">Meets Soul</em>
        </h1>

        <p className="text-ink-300 text-lg font-light max-w-xl mx-auto leading-relaxed mb-10">
          From the royal kitchens of Rajasthan to your table — flavours handcrafted with generations of tradition and a modern touch.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <a
            href="#menu"
            className="px-8 py-3.5 bg-ember-500 text-ink-50 rounded-full text-sm font-medium tracking-wide hover:bg-ember-400 transition-colors duration-200"
          >
            Explore the Menu
          </a>
          <button
            onClick={onChatOpen}
            className="px-8 py-3.5 border border-ink-700 text-ink-200 rounded-full text-sm font-medium tracking-wide hover:border-ember-500/50 hover:text-ink-50 transition-all duration-200"
          >
            💬 Chat & Order with AI
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="relative z-10 mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto w-full border-t border-ink-700/40 pt-8">
        {[
          { num: '200+', label: 'Dishes' },
          { num: '20yr', label: 'Legacy' },
          { num: '4.9★', label: 'Rating' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className="font-display text-2xl text-ember-400 font-light">{s.num}</div>
            <div className="text-xs text-ink-500 mt-1 tracking-widest uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <a href="#menu" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-600 hover:text-ink-400 transition-colors animate-shimmer">
        <ArrowDown size={18} />
      </a>
    </section>
  )
}
