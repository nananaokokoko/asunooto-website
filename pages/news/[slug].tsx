import React from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { formatDate } from '../../lib/format'
import { getNewsList, getNewsArticle, NewsArticle } from '../../lib/notion'

export default function NewsPage({ article }: { article: NewsArticle }) {
  return (
    <Layout title={article.title}>
      <div className="green page">
        <section className="section">
          <div className="heading-g">
            <p className="page-kicker">お知らせ</p>
          </div>
          <article className="article">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <h1>{article.title}</h1>
            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
          </article>
          <p className="center">
            <Link href="/news" className="btn btn-dark">
              お知らせ一覧へ
            </Link>
          </p>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const list = await getNewsList()
  return { paths: list.map((n) => ({ params: { slug: n.slug } })), fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const article = await getNewsArticle(String(params?.slug || ''))
  if (!article) return { notFound: true, revalidate: 60 }
  return { props: { article }, revalidate: 60 }
}
