import React from 'react'
import type { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import BackToTop from '../components/BackToTop'
import ExternalLink from '../components/ExternalLink'
import { getOwners, Owner } from '../lib/notion'

export default function OwnersPage({ owners }: { owners: Owner[] }) {
  return (
    <Layout title="共創オーナー">
      <div className="green page">
        <section className="section">
          <div className="heading-g">
            <h1>共創オーナー</h1>
            <p className="en">OWNERS</p>
          </div>
          <div className="owners-teaser">
            <p>
              【仮】アスノオトは2024年11月、配当をしない「非営利型株式会社」になりました。株主が増えるほど、共感の輪と持ち寄られる知恵がひろがる会社です。
            </p>
            <p>
              その株主の皆さまを、わたしたちは「共創オーナー」と呼んでいます。さとのば大学のビジョンに共感し、学びの場を共に創る仲間です。
            </p>
            <p className="center">
              <ExternalLink href="https://satonova.org/owners" className="btn btn-white">
                共創オーナーについて詳しく（さとのば大学のサイトへ）
              </ExternalLink>
              <span className="ext-note">さとのば大学のWEBサイトが別のタブで開きます</span>
            </p>
          </div>

          <h2 className="sub-g center">共創オーナーの皆さま</h2>
          {owners.length > 0 ? (
            <>
              <p className="center owners-note">掲載をご承諾いただいた方のお名前を掲載しています（{owners.length}名）</p>
              <ul className="owners">
                {owners.map((o, i) => (
                  <li key={i}>
                    <strong>{o.name}</strong>
                    {o.title && <span>{o.title}</span>}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="center owners-note">【仮】ただいま掲載の準備を進めています。</p>
          )}
          <p className="center">
            <BackToTop />
          </p>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { owners: await getOwners() }, revalidate: 60 }
}
