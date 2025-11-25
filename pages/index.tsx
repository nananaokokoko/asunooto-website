import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import MemberCard from '../components/MemberCard'
import NewsItem from '../components/NewsItem'
import { getMembers, getNews, getHistory, Member, News, History } from '../lib/notion'

interface HomeProps {
  members: Member[]
  news: News[]
  history: History[]
}

export default function Home({ members, news, history }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>株式会社アスノオト - Asunooto Inc.</title>
        <meta name="description" content="株式会社アスノオトは、都市と農村の新しい関係を創り、持続可能な未来を目指します。さとのば大学の運営を通じて、地域を旅する学びを提供しています。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-asunooto-light via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-asunooto-blue/5 to-transparent"></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066cc' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-asunooto-dark mb-6 animate-fade-in">
              じぶんのミライを<br />
              書きつづる
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 animate-slide-up animate-delay-200">
              アスノオトとは、未来に向けた協和音を<br className="hidden md:block" />
              「明日」の「音」であらわします。<br />
              ほしい未来に向けて恊働し、<br className="hidden md:block" />
              自分たちの未来を自分たちで書きつづることを目指します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animate-delay-300">
              <a 
                href="#about"
                className="button-primary inline-block text-center"
              >
                会社について
              </a>
              <a 
                href="https://satonoba.org"
                target="_blank"
                className="bg-white text-asunooto-blue px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium border-2 border-asunooto-blue text-center"
              >
                さとのば大学を見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 会社概要セクション */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-subtitle animate-fade-in">ABOUT</p>
            <h2 className="section-title animate-fade-in animate-delay-100">会社概要</h2>
            <div className="mt-12 text-left space-y-6 text-gray-700 leading-relaxed">
              <p className="animate-slide-up animate-delay-200">
                島根県海士町での活動で知られる株式会社風と土と（旧：株式会社巡の環）の共同創業者である信岡良亮が、地域と都市の新しい関係作りのために2015年に創業。
              </p>
              <p className="animate-slide-up animate-delay-300">
                都市と地方、経営者と従業員、生産者と消費者といった対立関係を協働関係に変える相互理解支援を、企業研修を通じて行ってきました。現在は地域を巡り仲間と共に学び合う「さとのば大学」を主催、運営しています。
              </p>
              <p className="animate-slide-up animate-delay-400">
                ひとりひとりが未来を決める担い手として、ほしい未来はどんなものか、なりゆきの未来にそれはあるのか。その二つにギャップがあるなら、小さな一歩をどう踏み出すかを学ぶための機会を創る。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center animate-fade-in animate-delay-100">
                <div className="w-16 h-16 bg-asunooto-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-asunooto-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">教育イノベーション</h3>
                <p className="text-sm text-gray-600">地域を旅しながら学ぶ新しい大学の形</p>
              </div>
              
              <div className="text-center animate-fade-in animate-delay-200">
                <div className="w-16 h-16 bg-asunooto-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-asunooto-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">地域共創</h3>
                <p className="text-sm text-gray-600">都市と農村をつなぐコミュニティづくり</p>
              </div>
              
              <div className="text-center animate-fade-in animate-delay-300">
                <div className="w-16 h-16 bg-asunooto-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-asunooto-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">持続可能な未来</h3>
                <p className="text-sm text-gray-600">次世代に残す豊かな社会の実現</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 沿革セクション */}
      <section id="history" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-subtitle animate-fade-in">HISTORY</p>
              <h2 className="section-title animate-fade-in animate-delay-100">沿革</h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
              <div className="space-y-8">
                {history.map((item, index) => (
                  <div 
                    key={item.id}
                    className="relative pl-8 border-l-2 border-asunooto-light animate-slide-up"
                    style={{ animationDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-asunooto-blue rounded-full"></div>
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-asunooto-blue font-bold text-lg">
                        {item.year}
                        {item.month && <span className="text-sm font-medium">.{item.month}</span>}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ニュースセクション */}
      <section id="news" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle animate-fade-in">NEWS</p>
            <h2 className="section-title animate-fade-in animate-delay-100">ニュース</h2>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
            {news.length > 0 ? (
              news.map((item, index) => (
                <NewsItem key={item.id} news={item} delay={200 + index * 100} />
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                ニュースはありません
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 沿革セクション */}
      <section id="history" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle animate-fade-in">HISTORY</p>
            <h2 className="section-title animate-fade-in animate-delay-100">沿革</h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* 縦線 */}
              <div className="absolute left-0 md:left-24 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {/* 沿革アイテム */}
              {history.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 md:gap-8 mb-8 last:mb-0 animate-slide-up"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-20 md:w-24 text-right">
                    <span className="font-display text-lg font-bold text-asunooto-blue">
                      {item.year}
                    </span>
                    {item.month && (
                      <span className="text-sm text-gray-500 block">{item.month}</span>
                    )}
                  </div>
                  
                  <div className="relative flex-grow pl-8">
                    {/* 点 */}
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-white border-2 border-asunooto-blue rounded-full"></div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* メンバーセクション */}
      <section id="members" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle animate-fade-in">MEMBERS</p>
            <h2 className="section-title animate-fade-in animate-delay-100">メンバー紹介</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <MemberCard key={member.id} member={member} delay={200 + index * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-asunooto-light to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-subtitle animate-fade-in">CONTACT</p>
            <h2 className="section-title animate-fade-in animate-delay-100">お問い合わせ</h2>
            <p className="text-gray-700 mt-6 mb-8 animate-slide-up animate-delay-200">
              ご質問・ご相談はお気軽にお問い合わせください
            </p>
            <a 
              href="mailto:info@asunooto.co.jp"
              className="button-primary inline-block animate-slide-up animate-delay-300"
            >
              メールでお問い合わせ
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const members = await getMembers()
  const news = await getNews()
  const history = await getHistory()

  return {
    props: {
      members,
      news,
      history,
    },
  }
}
