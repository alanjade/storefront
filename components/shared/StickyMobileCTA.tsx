/* ── StickyMobileCTA.tsx ─────────────────────────────────────────────── */

'use client'

import { motion } from 'framer-motion'
import { MessageCircle, ShoppingBag } from 'lucide-react'
import { generateGeneralInquiryLink } from '@/lib/utils'

export function StickyMobileCTA() {
  const waLink = generateGeneralInquiryLink()

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      className="md:hidden mobile-cta-bar"
    >
      <div className="flex gap-3 max-w-lg mx-auto">
        <a
          href="#products"
          className="flex-1 flex items-center justify-center gap-2 rounded-full text-sm font-semibold text-gray-700 bg-gray-100 transition-all hover:bg-gray-200 active:scale-95"
          style={{ minHeight: '48px' }}
        >
          <ShoppingBag className="w-4 h-4" />
          Browse
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] flex items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: 'var(--color-primary)', minHeight: '48px' }}
        >
          <MessageCircle className="w-4 h-4" />
          Order on WhatsApp
        </a>
      </div>
    </motion.div>
  )
}