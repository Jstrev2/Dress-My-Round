import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Revolutionary Golf Brands Ranking | Dress My Round',
  description: 'Interactive, data-driven ranking of the world\'s top golf clothing brands. Compare performance, sustainability, style ratings, and weather-specific capabilities.',
  keywords: 'golf brands ranking, best golf clothing brands, golf apparel comparison, golf brand reviews, premium golf clothing, sustainable golf brands',
}

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}