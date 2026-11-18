import React from 'react'

// 外部サイトへのリンクです。必ず別のタブで開きます。
interface Props {
  href: string
  className?: string
  children: React.ReactNode
}

export default function ExternalLink({ href, className, children }: Props) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="ext-icon" aria-hidden="true">
        ↗
      </span>
      <span className="sr-only">（別のタブで開きます）</span>
    </a>
  )
}
