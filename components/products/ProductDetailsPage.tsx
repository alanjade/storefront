'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MessageCircle, Star, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, Package, Truck, Shield, ArrowLeft
} from 'lucide-react'
import { Product } from '@/types'
import { formatPrice, generateOrderLink, getImageSrc } from '@/lib/utils'
import { products } from '@/data'
import { ProductCard } from './ProductCard'

interface Props {
  product: Product
}

export function ProductDetailsPage({ product }: Props) {
  const [currentImage, setCurrentImage] = useState(0)
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})
  const orderLink = generateOrderLink(product.name, product.price)

  const images = product.images.map((img, i) =>
    imgErrors[i] ? getImageSrc(null) : getImageSrc(img)
  )
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    /* pb-28 on mobile leaves room above the sticky CTA bar */
    <div className="min-h-screen bg-gray-50 pb-28 md:pb-12 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <div className="py-3 sm:py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-gray-900 transition-colors min-h-[44px] py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="hidden xs:inline">/</span>
          <span className="hidden xs:inline capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[160px] sm:max-w-xs">
            {product.name}
          </span>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12">

          {/* Images */}
          <div>
            {/* Main image */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-sm mb-3">
              <div className="relative h-72 sm:h-80 md:h-[460px]">
                <Image
                  src={images[currentImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  onError={() => setImgErrors(prev => ({ ...prev, [currentImage]: true }))}
                />
                {product.badge && (
                  <div
                    className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full text-white"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    {product.badge}
                  </div>
                )}

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                      onClick={() => setCurrentImage(i => (i - 1 + images.length) % images.length)}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                      onClick={() => setCurrentImage(i => (i + 1) % images.length)}
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === currentImage
                        ? 'border-green-500 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm flex-1">
              {/* Category + Rating */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
                  {product.category}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          i < Math.round(product.rating!)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                    <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                  </div>
                )}
              </div>

              {/* Name */}
              <h1
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <p className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
                ₦{formatPrice(product.price)}
              </p>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-4">
                {product.inStock ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">In Stock — Ready to ship</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-medium text-red-500">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-5 text-sm sm:text-base">
                {product.description}
              </p>

              {/* Specs */}
              {product.specs && product.specs.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Key Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.specs.map(spec => (
                      <span
                        key={spec}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Order CTA */}
              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-bold text-base transition-all active:scale-[0.98] shadow-lg mb-4 ${
                  !product.inStock ? 'opacity-50 pointer-events-none' : 'hover:scale-[1.02] wa-pulse'
                }`}
                style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' }}
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </a>

              {/* Trust indicators */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { icon: Package, label: 'Fast Dispatch' },
                  { icon: Truck, label: 'Nationwide Delivery' },
                  { icon: Shield, label: 'Authentic Product' },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1 text-center p-2 rounded-xl bg-gray-50"
                  >
                    <item.icon className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500 leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}