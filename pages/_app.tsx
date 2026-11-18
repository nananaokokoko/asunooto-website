import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // ひとつ前に見ていたページを覚えておきます（「トップページへ戻る」ボタンで使います）
  useEffect(() => {
    const remember = () => {
      try {
        window.sessionStorage.setItem('prevPath', window.location.pathname)
      } catch {}
    }
    router.events.on('routeChangeStart', remember)
    return () => router.events.off('routeChangeStart', remember)
  }, [router.events])
  return <Component {...pageProps} />
}
