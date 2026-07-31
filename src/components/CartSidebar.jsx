import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'

export default function CartSidebar({ open, onClose, cart, onUpdate, onRemove }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />}

      <aside className={`fixed top-0 right-0 h-full w-full max-w-sm bg-dark-950 border-l border-blue-500/10 z-50 flex flex-col transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-blue-500/10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-blue-400" />
            <span className="font-display text-lg text-dark-50 font-light">Your Order</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-silver-500 hover:text-dark-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="text-5xl opacity-20">🛒</div>
              <p className="text-silver-500 text-sm">Your cart is empty</p>
              <button onClick={onClose} className="text-blue-400 text-sm hover:underline">Browse the menu →</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-blue-500/10 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="font-display text-dark-50 font-light truncate">{item.name}</p>
                  {item.instructions && (
                    <p className="text-[11px] text-blue-400 mt-0.5 truncate">📝 {item.instructions}</p>
                  )}
                  <p className="text-blue-400 text-sm mt-0.5">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => item.qty === 1 ? onRemove(item.id) : onUpdate(item.id, item.qty - 1)}
                    className="w-6 h-6 rounded-full border border-blue-500/20 flex items-center justify-center text-silver-400 hover:border-blue-500 hover:text-blue-400 transition-all">
                    <Minus size={11} />
                  </button>
                  <span className="text-dark-100 text-sm w-4 text-center">{item.qty}</span>
                  <button onClick={() => onUpdate(item.id, item.qty + 1)}
                    className="w-6 h-6 rounded-full border border-blue-500/20 flex items-center justify-center text-silver-400 hover:border-blue-500 hover:text-blue-400 transition-all">
                    <Plus size={11} />
                  </button>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <p className="text-dark-200 text-sm w-16 text-right">₹{item.price * item.qty}</p>
                  <button onClick={() => onRemove(item.id)} className="text-red-400/50 hover:text-red-400 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-blue-500/10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-silver-400 text-sm">Total</span>
              <span className="font-display text-2xl text-dark-50 font-light"
                style={{ background: 'linear-gradient(135deg, #60A5FA, #CBD5E1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ₹{total}
              </span>
            </div>
            <button className="w-full py-3.5 bg-blue-600 text-white rounded-full text-sm font-medium tracking-wide hover:bg-blue-500 transition-colors glow-blue">
              Place Order
            </button>
            <p className="text-center text-xs text-silver-600">Estimated delivery: 25–30 min</p>
          </div>
        )}
      </aside>
    </>
  )
}
