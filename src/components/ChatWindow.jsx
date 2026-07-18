import { useState, useRef, useEffect } from 'react'
import { X, Send, ChefHat, Trash2, ShoppingCart } from 'lucide-react'
import { api } from '../services'

function generateSessionId() {
  return 'session_' + Math.random().toString(36).substring(2, 11)
}
const SESSION_ID = generateSessionId()

const QUICK_REPLIES = {
  english: ["What's the best dish? ⭐", "Show spicy options 🌶️", "Today's specials?", "I want Chinese food 🍜"],
  hindi:   ["सबसे अच्छी डिश? ⭐", "मसालेदार खाना 🌶️", "आज के स्पेशल?", "चाइनीज़ चाहिए 🍜"],
  hinglish:["Best dish kaunsi hai? ⭐", "Spicy kuch suggest karo 🌶️", "Aaj ke specials?", "Chinese food chahiye 🍜"],
}

const LANG_GREETINGS = {
  english:  "Hello! 👋 Welcome to Spice Garden — Jodhpur's 100% Pure Veg Restaurant 🌿 I'm Spice, your AI food assistant. May I know your name and what you'd like to eat today?",
  hindi:    "नमस्ते! 🙏 स्पाइस गार्डन में आपका स्वागत है — जोधपुर का 100% शुद्ध वेज रेस्टोरेंट 🌿 मैं स्पाइस हूं, आपका AI फूड असिस्टेंट। आपका नाम क्या है और आज क्या खाना है?",
  hinglish: "Namaste! 🙏 Welcome to Spice Garden — Jodhpur ka 100% Pure Veg Restaurant 🌿 Main Spice hoon, aapka AI food assistant. Aapka naam kya hai aur aaj kya mood hai?",
}

function LanguageSelector({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-6 py-8">
      <div className="text-center">
        <div className="text-4xl mb-3">🍛</div>
        <h3 className="font-display text-xl text-ink-50 font-light mb-1">Spice Garden</h3>
        <p className="text-ink-400 text-xs">100% Pure Veg Restaurant 🌿</p>
      </div>
      <div className="w-full">
        <p className="text-ink-300 text-sm text-center mb-4">Choose your language / भाषा चुनें</p>
        <div className="flex flex-col gap-3">
          {[
            { key: 'english',  label: 'English',         sub: 'I prefer English',       flag: '🇬🇧' },
            { key: 'hindi',    label: 'हिंदी',            sub: 'मैं हिंदी में बात करूंगा', flag: '🇮🇳' },
            { key: 'hinglish', label: 'Hinglish',        sub: 'Hindi + English mix',    flag: '✨' },
          ].map(lang => (
            <button
              key={lang.key}
              onClick={() => onSelect(lang.key)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-ink-700/50 bg-ink-700/20 hover:border-ember-500/50 hover:bg-ember-500/10 transition-all duration-200 text-left"
            >
              <span className="text-xl">{lang.flag}</span>
              <div>
                <p className="text-ink-50 text-sm font-medium">{lang.label}</p>
                <p className="text-ink-500 text-xs">{lang.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

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
        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isBot
            ? 'bg-ink-700/50 border border-ink-700/40 text-ink-100 rounded-bl-sm'
            : 'bg-ember-500 text-white rounded-br-sm'
        }`}>
          {msg.content}
          {msg.cartAdded && (
            <div className="mt-2 flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 rounded-lg px-2 py-1">
              <ShoppingCart size={11} className="text-green-400" />
              <span className="text-[11px] text-green-400 font-medium">Added to cart! 🛒</span>
            </div>
          )}
        </div>
        <span className={`text-[10px] text-ink-600 px-1 ${isBot ? '' : 'text-right'}`}>
          {msg.time}
        </span>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="w-7 h-7 rounded-full bg-ember-500/20 border border-ember-500/30 flex items-center justify-center shrink-0">
        <ChefHat size={14} className="text-ember-400" />
      </div>
      <div className="bg-ink-700/50 border border-ink-700/40 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
        {[0,1,2].map(i => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-ink-500 animate-shimmer"
            style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  )
}

export default function ChatWindow({ open, onClose, onAddToCart }) {
  const [language, setLanguage] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(SESSION_ID)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function handleLanguageSelect(lang) {
    setLanguage(lang)
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const greeting = LANG_GREETINGS[lang]
    setMessages([{ role: 'assistant', content: greeting, time: now }])
  }

  async function send(text) {
    const userText = text || input.trim()
    if (!userText || loading) return
    setInput('')

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newMessages = [...messages, { role: 'user', content: userText, time: now }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const langInstruction = language === 'english'
        ? 'STRICT RULE: You MUST reply ONLY in English throughout this entire conversation. Never use Hindi or Hinglish words. Every single message must be in English only.'
        : language === 'hindi'
        ? 'STRICT RULE: आप इस पूरी बातचीत में केवल हिंदी में जवाब दें। कभी भी English या Hinglish का उपयोग न करें।'
        : 'STRICT RULE: You MUST reply in Hinglish (natural mix of Hindi and English) throughout this entire conversation.'

      const messagesWithLang = [
        { role: 'user', content: langInstruction },
        { role: 'assistant', content: 'Understood! I will follow the language instruction.' },
        ...newMessages.map(m => ({ role: m.role, content: m.content }))
      ]

      const res = await api.post('/chat/', {
        messages: messagesWithLang,
        session_id: sessionId,
      })

      const reply = res.data.reply
      const orderItems = res.data.order_items || []
      let cartAdded = false

      if (orderItems.length > 0 && onAddToCart) {
        orderItems.forEach(item => onAddToCart(item))
        cartAdded = true
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cartAdded,
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: language === 'hindi'
          ? 'माफ करें! कनेक्शन में समस्या है 😅'
          : language === 'english'
          ? 'Oops! Connection problem 😅 Please try again.'
          : 'Oops! Connection problem 😅 Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    } finally {
      setLoading(false)
    }
  }

  async function clearChat() {
    try { await api.delete(`/chat/${sessionId}/`) } catch {}
    setLanguage(null)
    setMessages([])
  }

  const quickReplies = language ? QUICK_REPLIES[language] : []

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose} />}

      <div className={`fixed bottom-6 right-6 z-50 flex flex-col w-[360px] h-[560px] bg-ink-900 border border-ink-700/50 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
        open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-ink-700/40 bg-ink-700/20 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-ember-500/20 border border-ember-500/40 flex items-center justify-center">
              <ChefHat size={16} className="text-ember-400" />
            </div>
            <div>
              <p className="text-ink-50 text-sm font-medium">Spice AI</p>
              <p className="text-[11px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online · 100% Pure Veg 🌿
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={clearChat} title="New conversation / नई बातचीत"
              className="p-1.5 text-ink-500 hover:text-red-400 transition-colors">
              <Trash2 size={15} />
            </button>
            <button onClick={onClose} className="p-1.5 text-ink-500 hover:text-ink-200 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        {!language ? (
          <LanguageSelector onSelect={handleLanguageSelect} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => <Bubble key={i} msg={m} />)}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies — only at start */}
            {messages.length <= 1 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map(q => (
                  <button key={q} onClick={() => send(q)}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-ember-500/30 text-ember-400 hover:bg-ember-500/10 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-ink-700/40 flex gap-2 shrink-0">
              <input type="text" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder={
                  language === 'hindi' ? 'अपना संदेश लिखें...'
                  : language === 'english' ? 'Type your message...'
                  : 'Apna message likho...'
                }
                className="flex-1 bg-ink-700/30 border border-ink-700/50 rounded-full px-4 py-2 text-sm text-ink-100 placeholder-ink-600 outline-none focus:border-ember-500/40 transition-colors"
              />
              <button onClick={() => send()} disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-full bg-ember-500 flex items-center justify-center text-white hover:bg-ember-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                <Send size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
