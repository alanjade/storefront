'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { generateGeneralInquiryLink } from '@/lib/utils'

export function FloatingWhatsAppButton() {
  const waLink = generateGeneralInquiryLink()

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      className="hidden md:block fixed bottom-8 right-8 z-50"
    >
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full text-white shadow-2xl wa-pulse transition-transform hover:scale-110 active:scale-95"
        style={{ background: 'var(--color-primary)' }}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </motion.div>
  )
}