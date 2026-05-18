'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageCircle, ChevronDown, ArrowRight, Star } from 'lucide-react'
import { storeConfig } from '@/config/store'
import { generateGeneralInquiryLink, getImageSrc } from '@/lib/utils'

export function HeroSection() {
  const waLink = generateGeneralInquiryLink()

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-gray-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImageSrc(storeConfig.heroImage)}
          alt="Store hero"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/90 to-gray-900/70" />
        <div
          className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'var(--color-primary)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: 'var(--color-secondary)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-24 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: Text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-5 sm:mb-6"
              style={{
                background: 'rgba(37, 211, 102, 0.15)',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                color: 'var(--color-primary)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-primary)' }} />
              Now accepting WhatsApp orders
            </motion.div>

            {/* Headline — scales from 36px on small to 72px on xl */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-4 sm:mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {storeConfig.tagline.split(' ').slice(0, 2).join(' ')}
              {' '}
              <span className="gradient-text">
                {storeConfig.tagline.split(' ').slice(2).join(' ')}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {storeConfig.description}
            </motion.p>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-3 mb-6 sm:mb-8 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {['bg-pink-400', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400'].map((color, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-gray-900 ${color}`} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-400">1,200+ happy customers</p>
              </div>
            </motion.div>

            {/* CTAs — stack on mobile, row on sm+ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-white font-semibold text-base transition-all hover:scale-105 active:scale-95 shadow-lg wa-pulse"
                style={{ background: 'var(--color-primary)' }}
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </a>
              <a
                href="#products"
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-semibold text-base transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                }}
              >
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right: Product showcase cards — only on lg+ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden lg:block relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80', label: 'Wireless Earbuds', price: '₦45,000', badge: 'Best Seller' },
                { img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80', label: 'Designer Bag', price: '₦78,000', badge: 'New' },
                { img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', label: 'Smart Watch', price: '₦95,000', badge: 'Premium' },
                { img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80', label: 'Skincare Set', price: '₦32,000', badge: 'Top Rated' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glass-dark rounded-2xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.label}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="200px"
                    />
                    <div
                      className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                      style={{ background: 'var(--color-primary)' }}
                    >
                      {item.badge}
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-medium truncate">{item.label}</p>
                    <p className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{item.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-28 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  )
}