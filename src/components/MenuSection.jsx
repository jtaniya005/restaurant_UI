import { useState } from 'react'
import { Plus, Flame, Leaf, Star } from 'lucide-react'
import { MENU_ITEMS, CATEGORIES } from '../services'

function SpiceDots({ level }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i < level ? 'bg-ember-400' : 'bg-ink-700'}`}
        />
      ))}
    </div>
  )
}

function MenuCard({ item, onAdd, cart }) {
  const isInCart = cart.some(i => i.id === item.id)

  function handleAdd() {
    onAdd(item)
  }

  return (
    <div className="group relative bg-ink-700/20 border border-ink-700/40 rounded-2xl p-5 hover:border-ember-500/30 hover:bg-ink-700/30 transition-all duration-300 flex flex-col gap-3">
      {/* Special badge */}
      {item.tags.includes('special') && (
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-ember-500/15 border border-ember-500/25 rounded-full px-2 py-0.5">
          <Star size={10} className="text-ember-400 fill-ember-400" />
          <span className="text-[10px] text-ember-400 font-medium tracking-wide">Chef's pick</span>
        </div>
      )}

      <div>
        <h3 className="font-display text-lg text-ink-50 font-light leading-snug pr-20">{item.name}</h3>
        <p className="text-ink-400 text-sm mt-1.5 leading-relaxed">{item.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {item.tags.includes('veg') && (
          <span className="inline-flex items-center gap-1 text-[11px] text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-2 py-0.5">
            <Leaf size={10} /> Veg
          </span>
        )}
        {item.tags.includes('spicy') && (
          <span className="inline-flex items-center gap-1 text-[11px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-full px-2 py-0.5">
            <Flame size={10} /> Spicy
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-ink-700/30">
        <div className="flex flex-col gap-1">
          <span className="font-display text-xl text-ember-300 font-light">₹{item.price}</span>
          {item.spice > 0 && <SpiceDots level={item.spice} />}
        </div>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            isInCart
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-ember-500/15 text-ember-300 border border-ember-500/25 hover:bg-ember-500 hover:text-white hover:border-ember-500'
          }`}
        >
          {isInCart ? '✓ Added' : <><Plus size={14} /> Add</>}
        </button>
      </div>
    </div>
  )
}

export default function MenuSection({ onAdd, cart }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [itemsToShow, setItemsToShow] = useState(9)

  const filtered = MENU_ITEMS
    .filter(item => activeCategory === 'all' ? true : item.category === activeCategory)

  const displayed = filtered.slice(0, itemsToShow)
  const hasMore = filtered.length > itemsToShow

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    setItemsToShow(9)
  }

  return (
    <section id="menu" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <p className="section-label mb-3">Our Menu</p>
        <h2 className="display-heading text-ink-50" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          Crafted with Passion
        </h2>
        <p className="text-ink-400 mt-4 max-w-md text-sm leading-relaxed">
          From Rajasthani hhandleCategoryChangeChinese signatures — every dish tells a story.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
              activeCategory === cat.id
                ? 'bg-ember-500 text-white border border-ember-500'
                : 'border border-ink-700 text-ink-400 hover:border-ink-500 hover:text-ink-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {displayed.map(item => (
          <MenuCard key={item.id} item={item} onAdd={onAdd} cart={cart} />
        ))}
      </div>

      {/* See More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setItemsToShow(prev => prev + 9)}
            className="px-6 py-2.5 rounded-full text-sm font-medium bg-ember-500/15 text-ember-300 border border-ember-500/25 hover:bg-ember-500 hover:text-white hover:border-ember-500 transition-all duration-200"
          >
            See More
          </button>
        </div>
      )}
    </section>
  )
}
