/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // ブラウザの「戻る」で、見ていた場所に戻れるようにします
  experimental: { scrollRestoration: true },
  async redirects() {
    return [
      // 旧サイトのお知らせURL（/news/2025/08/post-22.html など）を新しいURLへ転送
      { source: '/news/:y/:m/:slug(post-\\d+).html', destination: '/news/:slug', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
    ]
  },
}

module.exports = nextConfig
