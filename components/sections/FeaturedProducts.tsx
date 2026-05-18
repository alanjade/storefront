'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Product, Category } from '@/types'
import { ProductCard } from '@/components/products/ProductCard'

interface Props { products: Product[]; categories: Category[] }

export function FeaturedProducts({ products, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <section id="products" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: 'var(--color-primary)' }}
          >
            Our Products
          </span>
          <h2
            className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Featured Collection
          </h2>
          <p className="mt-3 text-gray-500 max-w-md mx-auto text-sm sm:text-base">
            Carefully curated products with guaranteed quality and fast WhatsApp ordering.
          </p>
        </motion.div>

        {/* Category Filter — horizontally scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 sm:mb-8 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all min-h-[40px] ${
              activeCategory === 'all'
                ? 'text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={activeCategory === 'all' ? { background: 'var(--color-primary)' } : {}}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all min-h-[40px] ${
                activeCategory === cat.id
                  ? 'text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={activeCategory === cat.id ? { background: 'var(--color-primary)' } : {}}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid
            Mobile: 2 columns
            sm (640+): 2 columns
            lg (1024+): 3 columns
            xl (1280+): 4 columns
        */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 