import React from 'react'
import { News } from '../lib/notion'

interface NewsItemProps {
  news: News
  delay?: number
}

export default function NewsItem({ news, delay = 0 }: NewsItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const categoryColors: { [key: string]: string } = {
    'お知らせ': 'bg-blue-100 text-blue-700',
    '組織': 'bg-green-100 text-green-700',
    'イベント': 'bg-purple-100 text-purple-700',
    'メディア': 'bg-orange-100 text-orange-700',
  }

  return (
    <div 
      className="border-b border-gray-200 py-6 last:border-b-0 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex items-center gap-3 flex-shrink-0">
          <time className="text-sm text-gray-500 font-medium">
            {formatDate(news.date)}
          </time>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[news.category] || 'bg-gray-100 text-gray-700'}`}>
            {news.category}
          </span>
        </div>
        
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {news.url ? (
              <a 
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-asunooto-blue transition-colors"
              >
                {news.title}
                <span className="ml-2 text-sm text-gray-400">↗</span>
              </a>
            ) : (
              news.title
            )}
          </h3>
          {news.content && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {news.content}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
