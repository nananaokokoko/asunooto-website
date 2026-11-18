import React from 'react'
import type { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import BackToTop from '../components/BackToTop'
import { getSupportHtml } from '../lib/notion'

// 本文は Notion の「その他のご支援のかたち」ページで編集します
export default function SupportPage({ bodyHtml }: { bodyHtml: string }) {
  return (
    <Layout title="その他のご支援のかたち">
      <div className="green page">
        <section className="section">
          <div className="heading-g">
            <h1>その他のご支援のかたち</h1>
            <p className="en">SUPPORT</p>
          </div>
          <article className="article">
            <div className="article-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          </article>
          <p className="center">
            <BackToTop fallback="/#support" />
          </p>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { bodyHtml: await getSupportHtml() }, revalidate: 60 }
}
