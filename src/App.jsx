import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import { AboutSection, Footer } from './components/StaticSections'
import CartSidebar from './components/CartSidebar'
import ChatWindow from './components/ChatWindow'
import ChatFAB from './components/ChatFAB'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  function addToCart(item) {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i)
      return [...prev, { ...item, qty: item.qty || 1 }]
    })
  }

  function updateQty(id, qty) {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  function removeItem(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="min-h-screen bg-ink-900">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onChatOpen={() => setChatOpen(v => !v)}
      />

      <main>
        <Hero onChatOpen={() => setChatOpen(true)} />
        <MenuSection onAdd={addToCart} cart={cart} />
        <AboutSection />
        <Footer />
      </main>

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdate={updateQty}
        onRemove={removeItem}
      />

      <ChatWindow
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        onAddToCart={(item) => {
          addToCart(item)
          setCartOpen(true) // cart automatically open ho jaye
        }}
      />

      {!chatOpen && (
        <ChatFAB open={chatOpen} onClick={() => setChatOpen(true)} />
      )}
    </div>
  )
}
