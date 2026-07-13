import { X, Minus, Plus, ShoppingBag } from 'lucide-react'

export default function CartSidebar({ open, onClose, cart, onUpdate, onRemove }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-ink-900 border-l border-ink-700/40 z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-700/40">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-ember-400" />
            <span className="font-display text-lg text-ink-50 font-light">Your Order</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-ink-500 hover:text-ink-200 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="text-5xl opacity-20">🛒</div>
              <p className="text-ink-500 text-sm">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-ember-400 text-sm hover:underline"
              >
                Browse the menu →
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-ink-700/30 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="font-display text-ink-50 font-light truncate">{item.name}</p>
                  <p className="text-ember-400 text-sm mt-0.5">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => item.qty === 1 ? onRemove(item.id) : onUpdate(item.id, item.qty - 1)}
                    className="w-6 h-6 rounded-full border border-ink-700 flex items-center justify-center text-ink-400 hover:border-ember-500 hover:text-ember-400 transition-all"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="text-ink-200 text-sm w-4 text-center">{item.qty}</span>
                  <button
                    onClick={() => onUpdate(item.id, item.qty + 1)}
                    className="w-6 h-6 rounded-full border border-ink-700 flex items-center justify-center text-ink-400 hover:border-ember-500 hover:text-ember-400 transition-all"
                  >
                    <Plus size={11} />
                  </button>
                </div>
                <p className="text-ink-300 text-sm shrink-0 w-16 text-right">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-ink-700/40 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-ink-400 text-sm">Total</span>
              <span className="font-display text-2xl text-ink-50 font-light">₹{total}</span>
            </div>
            <button className="w-full py-3.5 bg-ember-500 text-white rounded-full text-sm font-medium tracking-wide hover:bg-ember-400 transition-colors">
              Place Order
            </button>
            <p className="text-center text-xs text-ink-600">Estimated delivery: 25–30 min</p>
          </div>
        )}
      </aside>
    </>
  )
}
