import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'

export default function CartSidebar({ open, onClose, cart, onUpdate, onRemove, customerName, paymentMethod, onCustomerNameChange, onPaymentMethodChange, onPlaceOrder }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />}

      <aside className={`fixed top-0 right-0 h-full w-full max-w-sm glass-card border-l border-gold-400/20 z-50 flex flex-col transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold-400/20 bg-ink-950/80">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-gold-300" />
              <span className="font-display text-lg text-ink-50 font-light tracking-wide">Your Order</span>
            </div>
            {customerName && (
              <p className="text-xs text-gold-400/80 uppercase tracking-wide">For: {customerName}</p>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 text-ink-400 hover:text-gold-300 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 bg-ink-950/40">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <div className="w-20 h-20 rounded-none bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto text-gold-300/50">
                <ShoppingBag size={32} />
              </div>
              <div>
                <p className="text-ink-100 text-lg font-display mb-1">Your cart is empty</p>
                <p className="text-ink-400 text-sm">Looks like you haven't added anything yet.</p>
              </div>
              <button onClick={onClose} className="btn-outline-gold mt-2">
                Browse the Menu
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-gold-400/15 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="font-display text-ink-50 font-light truncate text-lg">{item.name}</p>
                  {item.instructions && (
                    <p className="text-[11px] text-gold-400 mt-1 truncate">📝 {item.instructions}</p>
                  )}
                  <p className="text-gold-300 text-sm mt-1">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => item.qty === 1 ? onRemove(item.id) : onUpdate(item.id, item.qty - 1)}
                    className="w-6 h-6 rounded-none border border-gold-400/30 flex items-center justify-center text-ink-400 hover:border-gold-400 hover:text-gold-300 hover:bg-gold-400/10 transition-all">
                    <Minus size={11} />
                  </button>
                  <span className="text-ink-100 text-sm w-4 text-center">{item.qty}</span>
                  <button onClick={() => onUpdate(item.id, item.qty + 1)}
                    className="w-6 h-6 rounded-none border border-gold-400/30 flex items-center justify-center text-ink-400 hover:border-gold-400 hover:text-gold-300 hover:bg-gold-400/10 transition-all">
                    <Plus size={11} />
                  </button>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
                  <p className="text-ink-100 text-sm w-16 text-right font-medium">₹{item.price * item.qty}</p>
                  <button onClick={() => onRemove(item.id)} className="text-red-400/60 hover:text-red-400 transition-colors mt-1">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-6 border-t border-gold-400/20 flex flex-col gap-5 bg-ink-950/80">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-ink-400 uppercase tracking-wider">Name</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                value={customerName || ''}
                onChange={(e) => onCustomerNameChange && onCustomerNameChange(e.target.value)}
                className="bg-ink-800/50 border border-gold-400/20 px-3 py-2 text-sm text-ink-50 placeholder-ink-600 outline-none focus:border-gold-400/50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-ink-400 uppercase tracking-wider">Payment Method</label>
              <select 
                value={paymentMethod || ''}
                onChange={(e) => onPaymentMethodChange && onPaymentMethodChange(e.target.value)}
                className="bg-ink-800/50 border border-gold-400/20 px-3 py-2 text-sm text-ink-50 outline-none focus:border-gold-400/50"
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-ink-400 text-sm uppercase tracking-wider">Total Amount</span>
              <span className="font-display text-3xl text-gold-300 font-light">
                ₹{total}
              </span>
            </div>
            <button onClick={onPlaceOrder} className="btn-gold w-full text-center py-4 text-base">
              Place Order
            </button>
            <p className="text-center text-xs text-ink-500 uppercase tracking-widest">Estimated delivery: 25–30 min</p>
          </div>
        )}
      </aside>
    </>
  )
}
