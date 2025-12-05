export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dressmyround.com'

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Dress My Round",
    "description": "Get personalized golf attire recommendations based on real-time weather forecasts. Perfect clothing choices for your entire 4.5-hour golf round.",
    "url": siteUrl,
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Dress My Round"
    },
    "featureList": [
      "Real-time weather forecasts for golf courses",
      "Personalized clothing recommendations",
      "Golf-specific weather advice",
      "Walking vs riding activity adjustments",
      "4.5-hour round duration planning"
    ],
    "screenshot": `${siteUrl}/screenshot.png`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dress My Round",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://twitter.com/dressmyround",
      "https://facebook.com/dressmyround"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    }
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dress My Round",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/?location={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
    </>
  )
}