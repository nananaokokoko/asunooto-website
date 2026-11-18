import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// 「トップページへ戻る」ボタンです。
// トップページから来たときは、見ていた場所に戻ります（ブラウザの「戻る」と同じ動き）。
// ほかのサイトや検索から直接来たときは、トップページの先頭を開きます。
export default function BackToTop({ fallback = '/' }: { fallback?: string }) {
  const router = useRouter()
  return (
    <Link
      href={fallback}
      className="btn btn-dark"
      onClick={(e) => {
        let cameFromTop = false
        try {
          cameFromTop = window.sessionStorage.getItem('prevPath') === '/'
        } catch {}
        if (cameFromTop) {
          e.preventDefault()
          router.back()
        }
      }}
    >
      トップページへ戻る
    </Link>
  )
}
