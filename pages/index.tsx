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
        <title>株式会社アスノオト - ASUNOOTO</title>
        <meta name="description" content="未来に希望を持ち、ほしい未来のために自ら共創できる人々であふれる社会を目指します。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ヒーローセクション */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-blue-50">
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            {/* アスノオトロゴ */}
            <img 
              src="/asunooto-logo.png" 
              alt="アスノオト" 
              className="mx-auto h-24 md:h-32 mb-4"
            />
          </div>
        </div>
      </section>

      {/* アスノオトとは */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text">
              アスノオト
            </span>
            <span className="text-gray-900 ml-2">とは？</span>
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <p className="text-center text-gray-700 leading-relaxed mb-8">
              アスノオトには
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-center">
                <span className="text-blue-500 font-bold">「明日」</span>の
                <span className="text-yellow-500 font-bold">「音」</span> ▷ 
                未来に向けた<span className="text-pink-500 font-bold">協和音</span>
              </p>
              <p className="text-center">
                <span className="text-pink-500 font-bold">「us」</span>
                <span className="text-blue-500 font-bold">「note」</span> ▷ 
                <span className="text-yellow-500">"私たち"</span>として書きつづる
              </p>
            </div>
            <p className="text-center text-gray-700 leading-relaxed">
              という、2つの想いを込めています。
            </p>
            <p className="text-center text-gray-700 leading-relaxed mt-6">
              未来に希望を持ち、ほしい未来のために<br />
              自ら共創できる人々であふれる社会を目指します。
            </p>
          </div>
        </div>
      </section>

      {/* 事業内容 */}
      <section id="project" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            PROJECT
          </h2>
          <p className="text-center text-blue-500 text-lg mb-12">事業内容</p>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex items-center mb-6">
              <img 
                src="/satonova-logo.png" 
                alt="さとのば大学" 
                className="h-16 mr-4"
              />
              <h3 className="text-2xl font-bold text-gray-900">さとのば大学</h3>
            </div>
            <p className="text-gray-700 leading-loose">
              日本全国４つの地域に１年ずつ暮らしながら、自分で立てたテーマに現地の人々と共に取り組む「プロジェクト学習」と、
              地域共創領域のトップランナーである講師陣や在校生と学び合う「オンライン学習」を行き来しながら学ぶ、
              新しいスタイルの市民大学です。
            </p>
            <p className="text-gray-700 leading-loose mt-4">
              「自分らしく社会と関わり、仲間と共にほしい未来を自分たちの手で創る」ことができる
              "未来共創人材"の育成を目指します。
            </p>
            <p className="mt-6">
              <a href="https://satonova.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                さとのば大学の詳細はこちら →
              </a>
            </p>
          </div>

          {/* 過去の事業 */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-center text-blue-500 mb-8">過去の事業</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600">ロゴ</span>
                </div>
                <p className="font-medium">しごとバー神田・運営</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600">ロゴ</span>
                </div>
                <p className="font-medium">地域共創カレッジ運営</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600">ロゴ</span>
                </div>
                <p className="font-medium">錦町ブンカイサン<br />アンバサダー</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600">ロゴ</span>
                </div>
                <p className="font-medium">TIPSアンバサダー</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600">ロゴ</span>
                </div>
                <p className="font-medium">ないものはないラボ参画</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600">ロゴ</span>
                </div>
                <p className="font-medium">島の大使館運営</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 代表メッセージ */}
      <section id="message" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            MESSAGE
          </h2>
          <p className="text-center text-pink-500 text-lg mb-12">代表メッセージ</p>
          
          <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-8 md:p-12">
            <p className="text-gray-700 leading-loose mb-4">
              一人では未来に希望を見出すことが難しいと思ったとき、諦めるでも孤軍奮闘するでもなく、
              一緒に未来を作ろうとしてくれる仲間がいることが、僕自身にとって一番の希望になっています。
            </p>
            <p className="text-gray-700 leading-loose mb-4">
              そんな「共創仲間」がいることが当たり前の社会になることを願いながら、
              人と人が未来に向けて出会える場づくりを一つ一つ形にしていきたいと思っています。
            </p>
            <p className="text-gray-700 leading-loose mb-4">
              各事業も、非営利型株式会社としての運営も、未来共創のための仲間集めの仕組みと考えておりますので、
              これからも"目指す未来"に共感いただける方と、色々な関わりを創造していきたいと思います。
            </p>
            <p className="text-right text-gray-900 font-bold mt-6">
              代表取締役 信岡良亮
            </p>
          </div>
        </div>
      </section>

      {/* ご支援いただける方へ */}
      <section id="support" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            SUPPORT
          </h2>
          <p className="text-center text-pink-500 text-lg mb-12">ご支援いただける方へ</p>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <p className="text-gray-700 leading-loose mb-4">
              私たちは、理念に共感してくださる皆さまと共に会社を育てるために「非営利型株式会社」として運営をしています。
            </p>
            <p className="mb-4">
              <a href="https://greenz.jp/2024/11/19/satonova_2024/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                非営利型株式会社について(紹介記事) →
              </a>
            </p>
            <p className="text-gray-700 leading-loose mb-4">
              株主の方は「オーナー」として、主にさとのば大学の様々な取り組みにご参加いただけます。
            </p>
            <p>
              <a href="https://satonova.org/owners" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                詳しくはこちら →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* メンバー */}
      <section id="members" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            MEMBERS
          </h2>
          <p className="text-center text-orange-500 text-lg mb-12">メンバー紹介</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* お知らせ */}
      <section id="news" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            NEWS
          </h2>
          <p className="text-center text-blue-500 text-lg mb-12">お知らせ</p>
          <div className="max-w-3xl mx-auto space-y-6">
            {news.map((item) => (
              <NewsItem key={item.id} news={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 沿革 */}
      <section id="history" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            HISTORY
          </h2>
          <p className="text-center text-purple-500 text-lg mb-12">沿革</p>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              <div className="space-y-8">
                {history.map((item) => (
                  <div key={item.id} className="relative flex items-start">
                    <div className="absolute left-8 w-4 h-4 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full -translate-x-1/2 ring-4 ring-white"></div>
                    <div className="ml-16 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                      <div className="flex items-center mb-2">
                        <span className="text-blue-500 font-bold text-lg">
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

      {/* 会社概要 */}
      <section id="company" className="py-20 bg-gradient-to-b from-teal-400 to-teal-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            会社概要
          </h2>
          <p className="text-center text-white text-lg mb-12">COMPANY</p>
          
          <div className="bg-white/95 rounded-2xl p-8 md:p-12 shadow-lg">
            <dl className="space-y-4">
              <div className="flex flex-col sm:flex-row">
                <dt className="font-bold text-gray-900 sm:w-32">会社名</dt>
                <dd className="text-gray-700 sm:ml-8">株式会社アスノオト（英文社名：asunooto.co.,ltd.）</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="font-bold text-gray-900 sm:w-32">設立</dt>
                <dd className="text-gray-700 sm:ml-8">2015年5月22日</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="font-bold text-gray-900 sm:w-32">資本金</dt>
                <dd className="text-gray-700 sm:ml-8">28,700,000円</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="font-bold text-gray-900 sm:w-32">代表者</dt>
                <dd className="text-gray-700 sm:ml-8">代表取締役 信岡 良亮</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="font-bold text-gray-900 sm:w-32">所在地</dt>
                <dd className="text-gray-700 sm:ml-8">〒101-0054 東京都千代田区神田錦町3‐21 (郵便BOX番号 1345)</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="font-bold text-gray-900 sm:w-32">事業内容</dt>
                <dd className="text-gray-700 sm:ml-8">
                  人材育成・教育事業<br />
                  ICTを含めたコミュニケーション・コンサルティング<br />
                  都市と地方、経営者と従業員、生産者と消費者といった対立関係を協働関係に変える相互理解支援
                </dd>
              </div>
            </dl>
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
