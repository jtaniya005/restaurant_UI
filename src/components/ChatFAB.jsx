import { MessageCircle, X } from 'lucide-react'

export default function ChatFAB({ open, onClick }) {
  return (
    <button onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
        open ? 'bg-dark-700 text-silver-300 scale-90' : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 glow-blue'
      }`}
      aria-label="Toggle chat">
      {open ? <X size={22} /> : <MessageCircle size={22} />}
      {!open && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-950 animate-pulse-slow" />
      )}
    </button>
  )
}
