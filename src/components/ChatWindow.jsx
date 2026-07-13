import { useState, useRef, useEffect } from 'react'
import { X, Send, ChefHat, Trash2 } from 'lucide-react'
import axios from 'axios'

// ── Unique session ID per browser tab ────────────────────────────────────────
function generateSessionId() {
  return 'session_' + Math.random().toString(36).substring(2, 11)
}

const SESSION_ID = generateSessionId()

// ── Quick replies ─────────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  "What's your best dish? ⭐",
  "Show me veg options 🥗",
  "I want something spicy 🌶️",
  "Suggest Chinese food 🍜",
  "What are today's specials?",
]

// ── Bubble component ──────────────────────────────────────────────────────────
function Bubble({ msg }) {
  const isBot = msg.role === 'assistant'
  return (
    <div className={`flex items-end gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-ember-500/20 border border-ember-500/30 flex items-center justify-center shrink-0 mb-1">
          <ChefHat size={14} className="text-ember-400" />
        </div>
      )}
      <div className="flex flex-col gap-1 max-w-[80%]">
        <div
          className={`relative px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isBot
              ? 'bg-ink-700/50 border border-ink-700/40 text-ink-100 rounded-bl-sm'
              : 'bg-ember-500 text-white rounded-br-sm'
          }`}
        >
          {msg.content}
        </div>
        <span className={`text-[10px] text-ink-600 px-1 ${isBot ? '' : 'text-right'}`}>
          {msg.time}
        </span>
      </div>
    </div>
  )
}

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="w-7 h-7 rounded-full bg-ember-500/20 border border-ember-500/30 flex items-center justify-center shrink-0">
        <ChefHat size={14} className="text-ember-400" />
      </div>
      <div className="bg-ink-700/50 border border-ink-700/40 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-ink-500 animate-shimmer"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Main ChatWindow ───────────────────────────────────────────────────────────
export default function ChatWindow({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Namaste! 🙏 Welcome to Spice Garden! I'm Spice, your AI food assistant. May I know your name? 😊",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(SESSION_ID)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // ── Send message ────────────────────────────────────────────────────────────
  async function send(text) {
    const userText = text || input.trim()
    if (!userText || loading) return
    setInput('')

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newMessages = [...messages, { role: 'user', content: userText, time: now }]
    setMessages(newMessages)
    setLoading(true)

    try {
      // Send to FastAPI with session_id for memory
      const res = await axios.post('/api/chat/', {
        messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        session_id: sessionId,
      })

      const reply = res.data.reply
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Oops! Connection problem 😅 Please check if backend is running.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  // ── Clear chat ──────────────────────────────────────────────────────────────
  async function clearChat() {
    try {
      await axios.delete(`/api/chat/${sessionId}`)
    } catch { /* ignore */ }

    setMessages([{
      role: 'assistant',
      content: "Namaste! 🙏 Welcome to Spice Garden! I'm Spice, your AI food assistant. May I know your name? 😊",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }])
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose} />
      )}

      <div
        className={`fixed bottom-6 right-6 z-50 flex flex-col w-[360px] h-[540px] bg-ink-900 border border-ink-700/50 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-ink-700/40 bg-ink-700/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-ember-500/20 border border-ember-500/40 flex items-center justify-center">
              <ChefHat size={16} className="text-ember-400" />
            </div>
            <div>
              <p className="text-ink-50 text-sm font-medium">Spice AI</p>
              <p className="text-[11px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online · Session: {sessionId.slice(-6)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              title="New conversation"
              className="p-1.5 text-ink-500 hover:text-red-400 transition-colors"
            >
              <Trash2 size={15} />
            </button>
            <button onClick={onClose} className="p-1.5 text-ink-500 hover:text-ink-200 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.map((m, i) => <Bubble key={i} msg={m} />)}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies — only at start */}
        {messages.length <= 1 && !loading && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {QUICK_REPLIES.map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-[11px] px-3 py-1.5 rounded-full border border-ember-500/30 text-ember-400 hover:bg-ember-500/10 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-ink-700/40 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type your message..."
            className="flex-1 bg-ink-700/30 border border-ink-700/50 rounded-full px-4 py-2 text-sm text-ink-100 placeholder-ink-600 outline-none focus:border-ember-500/40 transition-colors"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-full bg-ember-500 flex items-center justify-center text-white hover:bg-ember-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </>
  )
}
