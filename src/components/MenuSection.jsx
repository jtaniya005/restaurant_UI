import { useState, useMemo } from 'react'
import { Plus, Flame, Leaf, Star, Check, Search, X, SlidersHorizontal } from 'lucide-react'
import { MENU_ITEMS, CATEGORIES } from '../services'

import indianImg1 from '../assets/categories/indian.png'
import indianImg2 from '../assets/categories/indian_2.png'
import indianImg3 from '../assets/categories/indian_3.png'
import indianImg4 from '../assets/categories/indian_4.png'
import dalBaatiImg from '../assets/categories/dal-baati.jpg'
import gatteImg from '../assets/categories/gatte-ki-sabzi.jpg'
import kadhiImg from '../assets/categories/kadhi-pakora.jpg'
import chineseImg from '../assets/categories/chinese.png'
import continentalImg from '../assets/categories/continental.png'
import pizzaImg from '../assets/categories/pizza.png'
import breadsImg from '../assets/categories/breads.png'
import appetizersImg from '../assets/categories/appetizers.png'
import saladsImg from '../assets/categories/salads.png'
import dessertsImg from '../assets/categories/desserts.png'
import drinksImg from '../assets/categories/drinks.png'

const CATEGORY_IMAGES = {
  indian: [indianImg1, indianImg2, indianImg3, indianImg4],
  chinese: [chineseImg],
  continental: [continentalImg],
  pizza: [pizzaImg],
  breads: [breadsImg],
  appetizers: [appetizersImg],
  salads: [saladsImg],
  desserts: [dessertsImg],
  drinks: [drinksImg],
}

const SPECIFIC_IMAGES = {
  1: dalBaatiImg, // Dal Baati (using user's photo)
  2: gatteImg, // Gatte Ki Sabzi (using user's photo)
  3: indianImg2, // Paneer Butter Masala
  4: indianImg2, // Paneer Tikka Masala
  5: indianImg3, // Veg Dum Biryani
  6: kadhiImg, // Kadhi Pakora
  21: indianImg2, // Paneer Kadai
  22: indianImg2, // Palak Paneer
}

function DishPhoto({ item }) {
  let imgSrc = SPECIFIC_IMAGES[item.id];
  if (!imgSrc) {
    const imageArray = CATEGORY_IMAGES[item.category] || CATEGORY_IMAGES.indian;
    imgSrc = imageArray[item.id % imageArray.length];
  }
  return (
    <div className="relative h-40 -mx-5 -mt-5 mb-4 overflow-hidden">
      <img src={imgSrc} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-ink-900 to-transparent" />
    </div>
  )
}

function SpiceDots({ level }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < level ? 'bg-gold-400' : 'bg-ink-700'}`} />
      ))}
    </div>
  )
}

function MenuCard({ item, onAdd, cart }) {
  const isInCart = cart?.some(i => i.id === item.id) || false
  const [added, setAdded] = useState(false)

  function handleAdd() {
    onAdd(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="group relative glass-card p-5 hover:border-gold-400/30 transition-all duration-300 flex flex-col">
      <DishPhoto item={item} />

      {item.tags?.includes('special') && (
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-gold-400/20 border border-gold-400/40 px-2 py-0.5 z-10">
          <Star size={10} className="text-gold-300 fill-gold-300" />
          <span className="text-[10px] text-gold-300 font-medium">Chef's pick</span>
        </div>
      )}

      <h3 className="font-display text-lg text-ink-50 font-light leading-snug">{item.name}</h3>
      <p className="text-ink-400 text-sm mt-1.5 leading-relaxed line-clamp-2">{item.description}</p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {item.tags?.includes('veg') && (
          <span className="inline-flex items-center gap-1 text-[11px] text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5">
            <Leaf size={10} /> Veg
          </span>
        )}
        {item.tags?.includes('spicy') && (
          <span className="inline-flex items-center gap-1 text-[11px] text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5">
            <Flame size={10} /> Spicy
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gold-400/10">
        <div className="flex flex-col gap-1">
          <span className="font-display text-xl text-gold-300 font-light">₹{item.price}</span>
          {item.spice > 0 && <SpiceDots level={item.spice} />}
        </div>
        <button onClick={handleAdd}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
            added || isInCart
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-gold-400/10 text-gold-300 border border-gold-400/30 hover:bg-gold-400 hover:text-ink-950'
          }`}>
          {added || isInCart ? <><Check size={13} /> Added</> : <><Plus size={14} /> Add</>}
        </button>
      </div>
    </div>
  )
}

const PRICE_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹100', min: 0, max: 100 },
  { label: '₹100–₹200', min: 100, max: 200 },
  { label: '₹200–₹300', min: 200, max: 300 },
  { label: '₹300+', min: 300, max: Infinity },
]

export default function MenuSection({ onAdd, cart }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(9)

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceRange]
    return MENU_ITEMS.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory
      const matchSearch = !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchPrice = item.price >= range.min && item.price <= range.max
      return matchCat && matchSearch && matchPrice
    })
  }, [activeCategory, searchQuery, priceRange])

  const displayed = filtered.slice(0, itemsToShow)
  const hasMore = filtered.length > itemsToShow
  const hasActiveFilters = activeCategory !== 'all' || searchQuery || priceRange !== 0

  return (
    <section id="menu" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <p className="section-label mb-3">Discover Our Menu</p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="display-heading text-ink-50" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Exquisite Cuisine
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
              <input type="text" value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setItemsToShow(9) }}
                placeholder="Search dishes..."
                className="w-48 sm:w-56 bg-ink-800/50 border border-gold-400/20 pl-9 pr-4 py-2 text-sm text-ink-100 placeholder-ink-500 outline-none focus:border-gold-400/40" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-100">
                  <X size={13} />
                </button>
              )}
            </div>
            <button onClick={() => setShowFilters(v => !v)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm border transition-all ${
                showFilters || priceRange !== 0 ? 'bg-gold-400 text-ink-950 border-gold-400' : 'border-gold-400/20 text-ink-400 hover:border-gold-400/40'
              }`}>
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="glass-card p-5 mb-8 flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <p className="text-xs text-ink-400 mb-3 tracking-wide uppercase">Price Range</p>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((range, idx) => (
                <button key={range.label} onClick={() => { setPriceRange(idx); setItemsToShow(9) }}
                  className={`px-3 py-1.5 text-xs transition-all ${
                    priceRange === idx ? 'bg-gold-400 text-ink-950' : 'border border-gold-400/20 text-ink-400 hover:border-gold-400/40'
                  }`}>
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap mb-10 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setItemsToShow(9) }}
            className={`px-4 py-1.5 text-sm transition-all whitespace-nowrap uppercase tracking-wide ${
              activeCategory === cat.id ? 'bg-gold-400 text-ink-950' : 'border border-gold-400/20 text-ink-400 hover:border-gold-400/40'
            }`}>
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-ink-400 text-sm">No dishes found</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {displayed.map(item => <MenuCard key={item.id} item={item} onAdd={onAdd} cart={cart} />)}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button onClick={() => setItemsToShow(prev => prev + 9)} className="btn-outline-gold">
            Load More
          </button>
        </div>
      )}
    </section>
  )
}
