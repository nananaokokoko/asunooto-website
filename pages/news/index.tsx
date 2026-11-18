import React from 'react'
import type { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import BackToTop from '../../components/BackToTop'
import { formatDate } from '../../lib/format'
import { getNewsList, NewsItem } from '../../lib/notion'

export default function NewsIndex({ news }: { news: NewsItem[] }) {
  return (
    <Layout title="お知らせ">
      <div className="green page">
        <section className="section">
          <div className="heading-g">
            <h1>お知らせ</h1>
            <p className="en">WHAT&apos;S NEW</p>
          </div>
          <ul className="news-list">
            {news.map((n) => (
              <li key={n.slug}>
                <Link href={`/news/${n.slug}`}>
                  <time dateTime={n.date}>{formatDate(n.date)}</time>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="center">
            <BackToTop />
          </p>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { news: await getNewsList() }, revalidate: 60 }
}
