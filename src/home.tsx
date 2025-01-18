import React from 'react'
import { Cormorant, Montserrat } from 'next/font/google'
import { Phone, Mail, MapPin } from 'lucide-react'

const cormorant = Cormorant({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 ${montserrat.className} text-gray-100`}>
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <header className="text-center relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-64 h-64 border-4 border-yellow-300 rounded-full"></div>
          </div>
          <h1 className={`${cormorant.className} text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-4`}>
            JK Silk Sarees
          </h1>
          <p className="text-2xl text-yellow-100 font-light tracking-wide">Elegance Woven in Tradition</p>
        </header>

        <main className="relative">
          <div className="absolute inset-0 bg-white opacity-5 rounded-lg"></div>
          <div className="relative bg-gradient-to-br from-purple-800 to-indigo-800 rounded-lg p-8 shadow-2xl border border-yellow-300/30">
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-yellow-300/30 rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-yellow-300/30 rounded-br-lg"></div>
            <section>
              <h2 className={`${cormorant.className} text-4xl font-semibold text-yellow-300 mb-8`}>About Us</h2>
              <p className="text-lg leading-relaxed mb-4">
                JK Silk Sarees stands as a beacon of luxury in the world of traditional Indian attire. Our journey began with a vision to elevate the art of silk sarees, blending centuries-old craftsmanship with contemporary elegance.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Each saree in our exclusive collection is a masterpiece, meticulously handcrafted by our skilled artisans using only the finest silk threads. From the classic allure of Kanjivaram to the regal charm of Banarasi, and our innovative fusion designs, we offer a range that caters to the discerning tastes of modern women while honoring our rich textile heritage.
              </p>
              <p className="text-lg leading-relaxed">
                At JK Silk Sarees, we don't just sell garments; we curate experiences. Every drape tells a story of luxury, tradition, and unparalleled craftsmanship. Step into our world and embrace the legacy of silk, where each saree is not just worn, but celebrated.
              </p>
            </section>
          </div>
        </main>

        <section className="bg-gradient-to-r from-yellow-900 to-yellow-700 rounded-lg p-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="#FFF" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
            </svg>
          </div>
          <div className="relative z-10">
            <h2 className={`${cormorant.className} text-4xl font-semibold text-yellow-100 mb-8`}>Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-yellow-100">
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-yellow-300" />
                <span className="text-lg">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-yellow-300" />
                <span className="text-lg">info@jksilksarees.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-yellow-300" />
                <span className="text-lg">123 Silk Street, Kanchipuram, Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}