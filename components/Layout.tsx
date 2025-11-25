import React, { ReactNode } from 'react'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-asunooto-blue to-asunooto-light rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">ア</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">株式会社アスノオト</h1>
                <p className="text-xs text-asunooto-blue">ASUNOOTO Inc.</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-asunooto-blue transition-colors font-medium">
                ホーム
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-asunooto-blue transition-colors font-medium">
                私たちについて
              </Link>
              <Link href="#members" className="text-gray-700 hover:text-asunooto-blue transition-colors font-medium">
                メンバー
              </Link>
              <Link href="#news" className="text-gray-700 hover:text-asunooto-blue transition-colors font-medium">
                お知らせ
              </Link>
              <Link href="#history" className="text-gray-700 hover:text-asunooto-blue transition-colors font-medium">
                沿革
              </Link>
            </nav>

            {/* モバイルメニューボタン */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1">
        {children}
      </main>

      {/* フッター */}
      <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">株式会社アスノオト</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                「明日の音を、今日つくる。」<br />
                都市と農村の新しい関係を創り、<br />
                持続可能な未来を目指します。
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">リンク</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://satonova.org" target="_blank" rel="noopener noreferrer" 
                     className="text-sm text-gray-600 hover:text-asunooto-blue transition-colors">
                    さとのば大学
                  </a>
                </li>
                <li>
                  <Link href="#contact" className="text-sm text-gray-600 hover:text-asunooto-blue transition-colors">
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">お問い合わせ</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                〒700-0000<br />
                岡山県真庭市<br />
                info@asunooto.co.jp
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              © 2024 株式会社アスノオト All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
