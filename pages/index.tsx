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
  getProject,
  ProjectBlock,
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
  project: ProjectBlock[]
}

// ---- 事業内容の枠（文章とリンク先は Notion の「事業内容」の表で編集します）----
const TILE_COLORS = ['blue', 'orange', 'pink', 'green']

// 「旅する大学（4年制市民大学）」の（ ）の部分を少し小さく表示します
function Heading({ text }: { text: string }) {
  const m = text.match(/^(.*?)(（[^）]*）)$/)
  if (!m) return <>{text}</>
  return (
    <>
      {m[1]}
      <span className="banner-paren">{m[2]}</span>
    </>
  )
}
// 文章を改行ごとに段落にします
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split('\n')
        .filter((t) => t.trim())
        .map((t, i) => (
          <p key={i}>{t}</p>
        ))}
    </>
  )
}
// Notion に入れたリンク。外部サイトは別のタブで開きます
function BlockLink({ block, className, fallbackLabel }: { block: ProjectBlock; className: string; fallbackLabel: string }) {
  if (!block.href) return null
  const label = block.linkLabel || fallbackLabel
  return block.href.startsWith('/') ? (
    <Link href={block.href} className={className}>
      {label}
    </Link>
  ) : (
    <ExternalLink href={block.href} className={className}>
      {label}
    </ExternalLink>
  )
}

// ---- ここから下は、サイトに直接書いてある内容です ----
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

export default function Home({ members, news, history, company, message, ownersCount, project }: Props) {
  const lead = project.find((b) => b.place === 'はじめの文')
  const satonova = project.find((b) => b.place === 'さとのば大学')
  const tiles = project.filter((b) => b.place === 'タイル')
  const lllc = project.find((b) => b.place === 'LLLC')
  const supporters = project.find((b) => b.place === 'サポーター')
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
          {lead && (
            <p className="lead lead-lines">{lead.text}</p>
          )}

          {/* さとのば大学（いちばん大きなバナー） */}
          {satonova && (
            <article className="banner banner-satonova">
              <img src="/images/course01.jpg" alt="" className="banner-img" loading="lazy" />
              <div className="banner-body">
                <div className="banner-title">
                  <img src="/images/member_satonova.jpg" alt="" className="banner-logo" />
                  <div>
                    <p className="banner-kicker c-pink">{satonova.sub}</p>
                    <h3>
                      <Heading text={satonova.heading} />
                    </h3>
                  </div>
                </div>
                <Paragraphs text={satonova.text} />
                {satonova.href && (
                  <p className="banner-action">
                    <BlockLink block={satonova} className="btn btn-pink" fallbackLabel="詳しくはこちら" />
                    {!satonova.href.startsWith('/') && (
                      <span className="ext-note">さとのば大学のWEBサイトが別のタブで開きます</span>
                    )}
                  </p>
                )}
                {satonova.preparing && <span className="tag">準備中</span>}
              </div>
            </article>
          )}

          {/* タイル */}
          <div className={`grid4 grid4-${Math.min(tiles.length, 4)}`}>
            {tiles.map((t, i) => (
              <article key={t.heading} className={`tile tile-${TILE_COLORS[i % TILE_COLORS.length]}`}>
                <p className="tile-target">
                  <span className="tile-en">{t.heading}</span>
                  <span className="tile-ja">{t.sub}</span>
                </p>
                {t.name && <h4>{t.name}</h4>}
                {t.text && (
                  <div className="tile-text">
                    <Paragraphs text={t.text} />
                  </div>
                )}
                {t.items.length > 0 && (
                  <ul>
                    {t.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                <BlockLink block={t} className="more" fallbackLabel="詳しくはこちら" />
                {t.preparing && <span className="tag">準備中</span>}
              </article>
            ))}
          </div>

          {/* すべてが集まっていく場所 */}
          {lllc && (
            <>
              <p className="gather" aria-hidden="true">
                <span className="gather-dots" />
                <span className="gather-text">すべての学びは、学び合うコミュニティへ</span>
                <span className="gather-arrow">▼</span>
              </p>
              <article className="banner banner-lllc">
                <div className="banner-body">
                  <p className="banner-kicker">{lllc.sub}</p>
                  <h3>
                    <Heading text={lllc.heading} />
                  </h3>
                  <Paragraphs text={lllc.text} />
                  {lllc.href && (
                    <p>
                      <BlockLink block={lllc} className="btn btn-white" fallbackLabel="詳しくはこちら" />
                    </p>
                  )}
                  {lllc.preparing && <span className="tag">準備中</span>}
                </div>
              </article>
            </>
          )}

          {/* 支えてくださる皆さまも、同じコミュニティへ */}
          {supporters && (
            <>
              <p className="gather gather-up" aria-hidden="true">
                <span className="gather-arrow">▲</span>
                <span className="gather-text">共に学び合うコミュニティをつくってくださる皆さまと</span>
                <span className="gather-dots" />
              </p>
              <article id="support" className="banner banner-support">
                <div className="banner-body">
                  <p className="tile-target">
                    <span className="tile-en">{supporters.heading}</span>
                    <span className="tile-ja">{supporters.sub}</span>
                  </p>
                  {supporters.name && <h3>{supporters.name}</h3>}
                  <Paragraphs text={supporters.text} />
                  <p className="support-links">
                    <Link href="/owners" className="btn btn-dark">
                      共創オーナーの皆さまを見る
                    </Link>
                    <BlockLink block={supporters} className="btn btn-white btn-line" fallbackLabel="詳しくはこちら" />
                    <ExternalLink href="https://greenz.jp/2024/11/19/satonova_2024/" className="btn btn-white btn-line">
                      非営利型株式会社について（紹介記事）
                    </ExternalLink>
                    <Link href="/support" className="btn btn-white btn-line">
                      その他のご支援のかたち
                    </Link>
                  </p>
                  <span className="ext-note">↗ のボタンは、さとのば大学・greenz.jp のWEBサイトが別のタブで開きます</span>
                </div>
              </article>
            </>
          )}

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
  const [members, news, history, company, message, owners, project] = await Promise.all([
    getMembers(),
    getNewsList(),
    getHistory(),
    getCompany(),
    getMessage(),
    getOwners(),
    getProject(),
  ])
  return {
    props: { members, news, history, company, message, ownersCount: owners.length, project },
    // Notion を直すと、約1分後から新しい内容が表示されます
    revalidate: 60,
  }
}
