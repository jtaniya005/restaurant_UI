import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X } from 'lucide-react'

export default function Navbar({ cartCount, onCartOpen, onChatOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Menu', href: '#menu' },
    { label: 'Reservations', href: '#book-table' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-ink-950/95 backdrop-blur-md border-b border-gold-400/10' : 'bg-transparent'
    }`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <span className="text-gold-400 text-xl">✦</span>
          <span className="font-display text-xl font-light tracking-[0.1em] text-ink-50">SPICE GARDEN</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-xs text-ink-300 hover:text-gold-300 transition-colors tracking-[0.15em] uppercase">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button onClick={onChatOpen}
            className="hidden md:inline-flex items-center gap-2 text-xs px-4 py-2 border border-gold-400/30 text-gold-300 hover:bg-gold-400/10 transition-all tracking-widest uppercase">
            💬 AI Assistant
          </button>
          <button onClick={onCartOpen} className="relative p-2 text-ink-300 hover:text-gold-300 transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold-400 text-ink-950 text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 text-ink-300" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-ink-950/98 border-t border-gold-400/10 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="text-ink-200 text-sm tracking-wide py-1 uppercase">{l.label}</a>
          ))}
          <button onClick={() => { setMobileOpen(false); onChatOpen() }}
            className="text-left text-gold-300 text-sm py-1 uppercase">💬 Chat with AI</button>
        </div>
      )}
    </header>
  )
}
