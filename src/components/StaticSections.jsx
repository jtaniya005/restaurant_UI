export function AboutSection() {
  const features = [
    { icon: '🌶️', title: 'Authentic Spices', desc: 'Hand-picked from local Rajasthani farms, ground fresh each morning.' },
    { icon: '🤖', title: 'AI Food Assistant', desc: 'Chat with our AI to discover dishes, get recommendations, or place orders.' },
    { icon: '🚀', title: 'Fast Delivery', desc: 'Hot food at your door in 25–30 minutes, no compromise.' },
    { icon: '👨‍🍳', title: 'Master Chefs', desc: 'Curated by chefs with decades of experience in royal Rajasthani kitchens.' },
  ]

  return (
    <section id="about" className="py-24 px-6 border-t border-ink-700/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-3">Our Story</p>
            <h2 className="display-heading text-ink-50 mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              A Legacy of<br />Flavour Since 2005
            </h2>
            <p className="text-ink-400 text-sm leading-loose mb-4">
              Spice Garden was born from a simple belief — that the finest food needs no pretension. Rooted in the culinary traditions of Rajasthan, every recipe here carries the memory of a grandmother's kitchen, the precision of a trained chef, and the warmth of Rajasthani hospitality.
            </p>
            <p className="text-ink-400 text-sm leading-loose">
              Today we blend heirloom techniques with modern flavours, from regional Rajasthani classics to delicate Continental risottos, all under one roof.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map(f => (
              <div
                key={f.title}
                className="bg-ink-700/15 border border-ink-700/30 rounded-2xl p-5 hover:border-ember-500/20 transition-colors"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-display text-ink-100 font-light mb-1.5">{f.title}</h3>
                <p className="text-ink-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-ink-700/20 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-ember-400">✦</span>
            <span className="font-display text-lg text-ink-50 font-light">Spice Garden</span>
          </div>
          <p className="text-ink-500 text-xs leading-relaxed max-w-xs">
            Authentic Rajasthani cuisine with a modern heart. since 2005.
          </p>
        </div>

        <div>
          <p className="section-label mb-4">Contact</p>
          <ul className="flex flex-col gap-2 text-ink-400 text-sm">
            <li>📍 Clock Tower, Jodhpur, Rajasthan</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ hello@spicegarden.in</li>
          </ul>
        </div>

        <div>
          <p className="section-label mb-4">Hours</p>
          <ul className="flex flex-col gap-2 text-ink-400 text-sm">
            <li className="flex justify-between"><span>Mon – Fri</span><span className="text-ink-300">11am – 11pm</span></li>
            <li className="flex justify-between"><span>Sat – Sun</span><span className="text-ink-300">10am – 12am</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-ink-700/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-ink-700 text-xs">© 2025 Spice Garden. All rights reserved.</p>
        <p className="text-ink-700 text-xs">Powered by React + FastAPI 🚀</p>
      </div>
    </footer>
  )
}
