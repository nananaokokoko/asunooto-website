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

const Home: React.FC<HomeProps> = ({ members, news, history }) => {
  return (
    <Layout>
      <Head>
        <title>株式会社アスノオト - 明日の音を、今日つくる。</title>
        <meta name="description" content="株式会社アスノオトは、都市と農村の新しい関係を創り、持続可能な未来を目指します。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ヒーローセクション */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-asunooto-blue/5 to-transparent"></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066cc' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            明日の音を、<br />
            <span className="text-asunooto-blue">今日つくる。</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            株式会社アスノオトは、都市と農村の新しい関係を創り、<br className="hidden md:block" />
            持続可能な未来を目指します。
          </p>
        </div>
      </section>

      {/* 私たちについて */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            私たちについて
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-asunooto-light/10 to-transparent rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-asunooto-blue rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">さとのば大学の運営</h3>
              <p className="text-gray-600 leading-relaxed">
                「さとのば大学」の運営を通じて、地域を旅しながら学ぶ新しい教育の形を提供しています。
              </p>
            </div>
            <div className="bg-gradient-to-br from-asunooto-light/10 to-transparent rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-asunooto-blue rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">地域をつなぐ</h3>
              <p className="text-gray-600 leading-relaxed">
                都市と農村、人と地域、今と未来をつなぐ架け橋として、新しい価値を創造します。
              </p>
            </div>
            <div className="bg-gradient-to-br from-asunooto-light/10 to-transparent rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-asunooto-blue rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">未来を創る</h3>
              <p className="text-gray-600 leading-relaxed">
                一人ひとりが自分らしく生きられる社会を目指し、持続可能な未来を創造していきます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* メンバー */}
      <section id="members" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            メンバー
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* 沿革 */}
      <section id="history" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            沿革
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              <div className="space-y-8">
                {history.map((item) => (
                  <div key={item.id} className="relative flex items-start">
                    <div className="absolute left-8 w-4 h-4 bg-asunooto-blue rounded-full -translate-x-1/2 ring-4 ring-white"></div>
                    <div className="ml-16 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                      <div className="flex items-center mb-2">
                        <span className="text-asunooto-blue font-bold text-lg">
                          {item.year}年
                        </span>
                        {item.month && (
                          <span className="text-gray-600 ml-2">{item.month}</span>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {item.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ */}
      <section id="news" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            お知らせ
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {news.map((item) => (
              <NewsItem key={item.id} news={item} />
            ))}
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
    revalidate: 3600, // 1時間ごとに再生成
  }
}

export default Home
