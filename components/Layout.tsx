import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const MENU = [
  { href: '/#about', label: 'アスノオトとは？' },
  { href: '/#project', label: '事業内容' },
  { href: '/#message', label: '代表メッセージ' },
  { href: '/#support', label: 'ご支援いただける方へ' },
  { href: '/#news', label: 'お知らせ' },
  { href: '/#member', label: 'メンバー紹介' },
  { href: '/owners', label: '共創オーナー' },
  { href: '/#company', label: '会社概要' },
  { href: '/#contact', label: 'お問い合わせ' },
]

interface Props {
  title?: string
  description?: string
  children: React.ReactNode
}

export default function Layout({ title, description, children }: Props) {
  const [open, setOpen] = useState(false)
  const fullTitle = title
    ? `${title}｜株式会社アスノオト`
    : 'asunooto - アスノオト 未来に向けた関係性を育む'
  const desc =
    description ||
    '未来に希望を持ち、ほしい未来のために自ら共創できる人々であふれる社会を目指します。'
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:type" content="website" />
      </Head>

      <button
        type="button"
        className="menu-btn"
        aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="bar bar-p" />
        <span className="bar bar-o" />
        <span className="bar bar-b" />
      </button>

      {open && (
        <nav className="menu" aria-label="メインメニュー">
          <ul>
            {MENU.map((m) => (
              <li key={m.href}>
                <Link href={m.href} onClick={() => setOpen(false)}>
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {children}

      <footer className="footer">
        <p className="footer-lead">
          未来に希望を持ち、ほしい未来のために
          <br className="sp-only" />
          自ら共創できる人々であふれる社会を目指します。
        </p>
        <p>© Copyright asunooto.co.,ltd. All rights reserved.</p>
      </footer>
    </>
  )
}
