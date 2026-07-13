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
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink-900/95 backdrop-blur-md border-b border-ink-700/40' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <span className="text-ember-400 text-xl">✦</span>
          <span className="font-display text-xl font-light tracking-wide text-ink-50">
            Spice Garden
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-ink-300 hover:text-ink-50 transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onChatOpen}
            className="hidden md:inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-ember-500/50 text-ember-400 hover:bg-ember-500/10 transition-all duration-200"
          >
            <span className="text-base">💬</span>
            Ask AI
          </button>

          <button
            onClick={onCartOpen}
            className="relative p-2 text-ink-300 hover:text-ink-50 transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-ember-500 text-white text-[10px] font-medium flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-ink-300"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-ink-900/98 border-t border-ink-700/40 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-ink-200 text-sm tracking-wide py-1"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); onChatOpen() }}
            className="text-left text-ember-400 text-sm py-1"
          >
            💬 Chat with AI
          </button>
        </div>
      )}
    </header>
  )
}
