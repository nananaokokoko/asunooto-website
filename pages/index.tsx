/* eslint-disable @next/next/no-img-element */
import React from 'react'
import type { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import MemberCard from '../components/MemberCard'
import ExternalLink from '../components/ExternalLink'
import { formatDate } from '../lib/format'
import {
  getMembers,
  getNewsList,
  getHistory,
  getCompany,
  getMessage,
  getOwners,
  Member,
  NewsItem,
  HistoryItem,
  CompanyRow,
  Message,
} from '../lib/notion'

interface Props {
  members: Member[]
  news: NewsItem[]
  history: HistoryItem[]
  company: CompanyRow[]
  message: Message
  ownersCount: number
}

// ---- ここから下は、サイトに直接書いてある内容です ----
// 事業内容の4つのタイル（「for ○○」は対象、name は事業名）
const TILES = [
  {
    target: 'for School',
    targetJa: '学校・教育機関の皆さまへ',
    name: '【仮】学校向け 探究・地域留学プログラム',
    items: ['高校向け探究支援', 'Learning Journey（地域留学体験プログラム）', '連携校との取り組み'],
    preparing: false,
    color: 'blue',
  },
  {
    target: 'for Government',
    targetJa: '自治体の皆さまへ',
    name: '地域おこし協力隊研修【仮・事業名称未定】',
    items: ['地域おこし協力隊向けの研修'],
    preparing: true,
    color: 'orange',
  },
  {
    target: 'for Business',
    targetJa: '企業の皆さまへ',
    name: '【仮】企業向け研修・人材育成サポート',
    items: ['企業向け研修', '人事・人材育成のサポート'],
    preparing: true,
    color: 'pink',
  },
  {
    target: 'for Customer',
    targetJa: '一般の皆さまへ',
    name: '【仮】公開講座・旅のプログラム',
    items: ['一般向け公開講座', '旅のプログラム'],
    preparing: false,
    color: 'green',
  },
]
const PAST = [
  { name: 'しごとバー神田\n企画・運営', image: '/images/member_shigotobar.jpg' },
  { name: '地域共創カレッジ\n運営', image: '/images/member_colledge.jpg' },
  { name: '錦町ブンカイサン\nアンバサダー', image: '/images/member_bunkaisan.jpg' },
  { name: 'TIPS\nアンバサダー', image: '/images/member_tips.jpg' },
  { name: 'ないものはないラボ\n参画', image: '/images/member_naimonohanai.jpg' },
  { name: '島の大使館\n運営', image: '/images/member_taishikan.jpg' },
]

function Plane({ color }: { color: 'b' | 'o' | 'p' }) {
  return (
    <div className="plane-line" aria-hidden="true">
      <span className="dots" />
      <img src={`/images/paper_${color}.png`} alt="" className="plane" />
    </div>
  )
}

export default function Home({ members, news, history, company, message, ownersCount }: Props) {
  const officers = members.filter((m) => m.group === '役員')
  const staff = members.filter((m) => m.group !== '役員')
  return (
    <Layout>
      {/* ---------- メインビジュアル ---------- */}
      <header className="hero">
        <svg className="hero-bg" viewBox="0 0 1440 1466" preserveAspectRatio="none" aria-hidden="true">
          <polygon fill="#5EBAE7" points="0,0 0,1466 720,1294 720,0" />
          <polygon fill="#FC74B4" points="720,0 720,1294 1440,1466 1440,0" />
          <polygon fill="#FFD83B" points="0,0 0,1294 720,1466 720,0" />
          <polygon fill="#FDD034" points="720,0 720,1466 1440,1294 1440,0" />
        </svg>
        <div className="hero-inner">
          <h1>
            <img src="/images/logo2.svg" alt="アスノオト ASUNOOTO" className="hero-logo" />
          </h1>
          <img src="/images/paper_w.png" alt="" className="hero-plane" aria-hidden="true" />
          <p className="pill">Create to Social-With Relation</p>
        </div>
      </header>

      <main className="light">
        <img src="/images/cloud/cloud_02.png" alt="" className="cloud cloud-a" aria-hidden="true" />
        <img src="/images/cloud/cloud_05.png" alt="" className="cloud cloud-b" aria-hidden="true" />
        <img src="/images/cloud/cloud_06.png" alt="" className="cloud cloud-c" aria-hidden="true" />
        <img src="/images/cloud/cloud_07.png" alt="" className="cloud cloud-d" aria-hidden="true" />
        <img src="/images/cloud/cloud_03.png" alt="" className="cloud cloud-e" aria-hidden="true" />

        {/* ---------- アスノオトとは？ ---------- */}
        <section id="about" className="section">
          <h2 className="about-title">
            <img src="/images/about.png" alt="アスノオトとは？" />
          </h2>
          <div className="about-card">
            <p>アスノオトには</p>
            <p className="about-words">
              <span className="c-blue">「明日」</span>の<span className="c-orange">「音」</span>▷ 未来に向けた
              <span className="c-pink">協和音</span>
              <br />
              <span className="c-pink">「us」</span>
              <span className="c-blue">「note」</span>▷<span className="c-orange">“私たち”</span>
              として書きつづる
            </p>
            <p>という、2つの想いを込めています。</p>
            <p className="about-last">
              未来に希望を持ち、ほしい未来のために
              <br />
              自ら共創できる人々であふれる社会を目指します。
            </p>
          </div>
          <Plane color="b" />
        </section>

        {/* ---------- 事業内容 ---------- */}
        <section id="project" className="section">
          <div className="heading c-blue">
            <p className="en">PROJECT</p>
            <h2>事業内容</h2>
          </div>
          <p className="lead">
            【仮】ほしい未来を共につくるために、自ら学び、ときに学びほぐす。
            <br />
            アスノオトは、社会が変わっていくために必要な学びを、さまざまなかたちで届けています。
          </p>

          {/* さとのば大学（いちばん大きなバナー） */}
          <article className="banner banner-satonova">
            <img src="/images/course01.jpg" alt="" className="banner-img" loading="lazy" />
            <div className="banner-body">
              <div className="banner-title">
                <img src="/images/member_satonova.jpg" alt="" className="banner-logo" />
                <div>
                  <p className="banner-kicker c-pink">さとのば大学</p>
                  <h3>
                    旅する大学<span className="banner-paren">（4年制市民大学）</span>
                  </h3>
                </div>
              </div>
              <p>
                日本全国４つの地域に１年ずつ暮らしながら、自分で立てたテーマに現地の人々と共に取り組む「プロジェクト学習」と、地域共創領域のトップランナーである講師陣や在校生と学び合う「オンライン学習」を行き来しながら学ぶ、新しいスタイルの市民大学です。
              </p>
              <p>
                「自分らしく社会と関わり、仲間と共にほしい未来を自分たちの手で創る」ことができる“未来共創人材”
                の育成を目指します。
              </p>
              <p className="banner-action">
                <ExternalLink href="https://satonova.org/" className="btn btn-pink">
                  さとのば大学公式ホームページを見る
                </ExternalLink>
                <span className="ext-note">さとのば大学のWEBサイトが別のタブで開きます</span>
              </p>
            </div>
          </article>

          {/* 4つのタイル */}
          <div className="grid4">
            {TILES.map((t) => (
              <article key={t.target} className={`tile tile-${t.color}`}>
                <p className="tile-target">
                  <span className="tile-en">{t.target}</span>
                  <span className="tile-ja">{t.targetJa}</span>
                </p>
                <h4>{t.name}</h4>
                <ul>
                  {t.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                {t.preparing && <span className="tag">準備中</span>}
              </article>
            ))}
          </div>

          {/* すべてが集まっていく場所 */}
          <p className="gather" aria-hidden="true">
            <span className="gather-dots" />
            <span className="gather-text">すべての学びは、学び合うコミュニティへ</span>
            <span className="gather-arrow">▼</span>
          </p>
          <article className="banner banner-lllc">
            <div className="banner-body">
              <p className="banner-kicker">学び合うコミュニティ</p>
              <h3>
                Lifelong Learning Community<span className="banner-paren">（LLLC）</span>
              </h3>
              <p>
                【仮】わたしたちが大切にしているのは、教える・教わるだけでなく「学び合う」こと。さとのば大学も、学校・自治体・企業・一般の皆さまに向けた学びも、すべてはこのコミュニティにつながっていきます。ほしい未来を共につくる仲間と、生涯にわたって学び合う場です。
              </p>
              <span className="tag">準備中</span>
            </div>
          </article>

          <h3 className="sub">過去の事業</h3>
          <ul className="past">
            {PAST.map((p) => (
              <li key={p.name}>
                <img src={p.image} alt="" loading="lazy" />
                <span>{p.name}</span>
              </li>
            ))}
          </ul>
          <Plane color="o" />
        </section>

        {/* ---------- 代表メッセージ ---------- */}
        <section id="message" className="section">
          <div className="heading c-orange">
            <p className="en">MESSAGE</p>
            <h2>代表メッセージ</h2>
          </div>
          <div className="message">
            {message.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="signature">{message.signature}</p>
          </div>
          <Plane color="p" />
        </section>

        {/* ---------- ご支援いただける方へ ---------- */}
        <section id="support" className="section">
          <div className="heading c-pink">
            <p className="en">SUPPORT</p>
            <h2>ご支援いただける方へ</h2>
          </div>
          <p className="lead">
            私たちは、理念に共感してくださる皆さまと共に会社を育てるために「非営利型株式会社」として運営をしています。
          </p>
          <p className="center">
            <ExternalLink href="https://greenz.jp/2024/11/19/satonova_2024/" className="btn btn-white">
              非営利型株式会社について（紹介記事）
            </ExternalLink>
            <span className="ext-note">greenz.jp の記事が別のタブで開きます</span>
          </p>
          <p className="lead">
            株主の方は「オーナー」として、主にさとのば大学の様々な取り組みにご参加いただけます。
          </p>
          <p className="center">
            <ExternalLink href="https://satonova.org/owners" className="btn btn-white">
              詳しくはこちら
            </ExternalLink>
            <span className="ext-note">さとのば大学のWEBサイトが別のタブで開きます</span>
          </p>
        </section>
      </main>

      {/* ---------- ここから下は緑の部分 ---------- */}
      <svg className="green-edge" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <polygon fill="#55D8AB" points="0,0 720,80 1440,0 1440,80 0,80" />
      </svg>
      <div className="green">
        <section id="news" className="section">
          <div className="heading-g">
            <h2>お知らせ</h2>
            <p className="en">WHAT&apos;S NEW</p>
          </div>
          <ul className="news-list">
            {news.slice(0, 5).map((n) => (
              <li key={n.slug}>
                <Link href={`/news/${n.slug}`}>
                  <time dateTime={n.date}>{formatDate(n.date)}</time>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          {news.length > 5 && (
            <p className="center">
              <Link href="/news" className="btn btn-dark">
                過去のお知らせを見る
              </Link>
            </p>
          )}
        </section>

        <section id="member" className="section">
          <div className="heading-g">
            <h2>メンバー紹介</h2>
            <p className="en">MEMBER</p>
          </div>
          <h3 className="sub-g">役員</h3>
          <div className="members">
            {officers.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
          <h3 className="sub-g">スタッフ</h3>
          <div className="members members-staff">
            {staff.map((m) => (
              <MemberCard key={m.id} member={m} small />
            ))}
          </div>
        </section>

        <section id="owners" className="section">
          <div className="heading-g">
            <h2>共創オーナー</h2>
            <p className="en">OWNERS</p>
          </div>
          <div className="owners-teaser">
            <p>
              【仮】アスノオトは、配当をしない「非営利型株式会社」です。株主の皆さまを、わたしたちは「共創オーナー」と呼んでいます。
              未来を共に創る仲間として、たくさんの方々がアスノオトとさとのば大学を支えてくださっています。
            </p>
            <p className="center">
              <Link href="/owners" className="btn btn-dark">
                {ownersCount > 0 ? `共創オーナーの皆さま（${ownersCount}名）を見る` : '共創オーナーについて'}
              </Link>
            </p>
          </div>
        </section>

        <section id="company" className="section">
          <div className="heading-g">
            <h2>会社概要</h2>
            <p className="en">COMPANY</p>
          </div>
          <dl className="company">
            {company.map((row) => (
              <React.Fragment key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </React.Fragment>
            ))}
          </dl>
          <h3 className="sub-g center">沿革</h3>
          <ol className="history">
            {history.map((h, i) => (
              <li key={i}>
                <strong>
                  {h.year}年{h.month ? `${h.month}月` : ''}
                </strong>
                <span>{h.text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="section contact">
          <a href="mailto:info@asunooto.co.jp" className="contact-btn">
            お問い合わせ
          </a>
          <p>info@asunooto.co.jp</p>
          <div className="planes" aria-hidden="true">
            <img src="/images/paper_p.png" alt="" />
            <img src="/images/paper_b.png" alt="" />
            <img src="/images/paper_o.png" alt="" />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [members, news, history, company, message, owners] = await Promise.all([
    getMembers(),
    getNewsList(),
    getHistory(),
    getCompany(),
    getMessage(),
    getOwners(),
  ])
  return {
    props: { members, news, history, company, message, ownersCount: owners.length },
    // Notion を直すと、約1分後から新しい内容が表示されます
    revalidate: 60,
  }
}
