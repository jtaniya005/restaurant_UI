import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import { AboutSection, BookTableSection, ReviewsSection, Footer } from './components/StaticSections'
import CartSidebar from './components/CartSidebar'
import ChatWindow from './components/ChatWindow'
import ChatFAB from './components/ChatFAB'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [customerName, setCustomerName] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)

  function addToCart(item, cName, pMethod) {
    if (cName) setCustomerName(cName)
    if (pMethod) setPaymentMethod(pMethod)

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1), instructions: item.instructions || i.instructions } : i)
      return [...prev, { ...item, qty: item.qty || 1 }]
    })
  }

  function updateQty(id, qty) {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  function removeItem(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  function handlePlaceOrder() {
    if (cart.length === 0) return
    const name = customerName || 'Guest'
    alert(`Thank you, ${name}! Your order has been placed successfully.`)
    setCart([])
    setCartOpen(false)
    setCustomerName(null)
    setPaymentMethod(null)
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onChatOpen={() => setChatOpen(v => !v)}
      />

      <main>
        <Hero onChatOpen={() => setChatOpen(true)} />
        <MenuSection onAdd={addToCart} cart={cart} />
        <BookTableSection />
        <ReviewsSection />
        <AboutSection />
        <Footer />
      </main>

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdate={updateQty}
        onRemove={removeItem}
        customerName={customerName}
        paymentMethod={paymentMethod}
        onCustomerNameChange={setCustomerName}
        onPaymentMethodChange={setPaymentMethod}
        onPlaceOrder={handlePlaceOrder}
      />

      <ChatWindow
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        onAddToCart={(item, cName, pMethod) => {
          addToCart(item, cName, pMethod)
          setCartOpen(true)
        }}
      />

      {!chatOpen && (
        <ChatFAB open={chatOpen} onClick={() => setChatOpen(true)} />
      )}
    </div>
  )
}
