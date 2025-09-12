import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Q Methodology - Transform Subjective Perspectives into Quantitative Insights',
  description: 'Discover the power of Q methodology for systematic analysis of subjective perspectives. Our comprehensive platform transforms qualitative insights into quantitative understanding through advanced research tools.',
  keywords: 'Q methodology, qualitative research, subjective analysis, factor analysis, research platform, academic research, perspective analysis',
  authors: [{ name: 'Q Methodology Platform' }],
  creator: 'Q Methodology Platform',
  publisher: 'Q Methodology Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://qmethodology.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Q Methodology - Transform Subjective Perspectives',
    description: 'The most comprehensive platform for Q methodology research. Transform qualitative insights into quantitative understanding.',
    url: 'https://qmethodology.example.com',
    siteName: 'Q Methodology Platform',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Q Methodology Research Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Q Methodology Research Platform',
    description: 'Transform subjective perspectives into quantitative insights with our comprehensive Q methodology tools.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body 
        className={`
          min-h-screen bg-white font-inter antialiased
          scroll-smooth selection:bg-blue-200 selection:text-blue-900
        `}
        suppressHydrationWarning={true}
      >
        <div id="root" className="relative">
          {children}
        </div>
        
        {/* Smooth scroll polyfill for older browsers */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!('scrollBehavior' in document.documentElement.style)) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
                document.head.appendChild(script);
                script.onload = function() {
                  window.__forceSmoothScrollPolyfill__ = true;
                  window.smoothScrollPolyfill.polyfill();
                };
              }
            `,
          }}
        />
      </body>
    </html>
  )
}