// Notion から内容を読み込む部分です。
// Notion につながっていないとき・読み込みに失敗したときは、
// content/site.json（控えの内容）を表示します。
import { Client } from '@notionhq/client'
import fallbackJson from '../content/site.json'

export interface Member {
  id: string
  name: string
  title: string
  group: string // 「役員」または「スタッフ」
  order: number
  bio: string
  photo: string | null
}
export interface NewsItem {
  slug: string
  date: string // 2026-12-01 の形
  title: string
  pageId?: string | null
}
export interface NewsArticle extends NewsItem {
  bodyHtml: string
}
export interface HistoryItem {
  year: number
  month: number | null
  text: string
}
export interface CompanyRow {
  label: string
  value: string
}
export interface Message {
  body: string[]
  signature: string
}
// 事業内容の1つの枠
export interface ProjectBlock {
  place: string // はじめの文 / さとのば大学 / タイル / LLLC / サポーター
  heading: string
  sub: string
  name: string
  text: string
  items: string[]
  href: string | null
  linkLabel: string
  preparing: boolean
  order: number
}
export interface Owner {
  name: string
  title: string
}

const fallback = fallbackJson as unknown as {
  members: Member[]
  news: NewsArticle[]
  history: HistoryItem[]
  company: CompanyRow[]
  message: Message
  owners: Owner[]
  support: { bodyHtml: string }
  project: ProjectBlock[]
}

// Notion の接続キー（Vercel の環境変数 NOTION_TOKEN に入れます）
const TOKEN = process.env.NOTION_TOKEN || ''

// 「アスノオト公式サイト 更新用」ページの中にある表の番号
const IDS = {
  members: process.env.NOTION_MEMBERS_DB || '81a6cf48f5104bff9b430221db3f1de9',
  news: process.env.NOTION_NEWS_DB || 'ec010e9f9261492ab4bcfd52337292af',
  history: process.env.NOTION_HISTORY_DB || 'ef74577c2fd94929b907f0952f03d111',
  company: process.env.NOTION_COMPANY_DB || '206f3f1aca1c439295ec36476c3f61b0',
  owners: process.env.NOTION_OWNERS_DB || 'bd3b0f6380f5473d8a3c72e676ba3866',
  message: process.env.NOTION_MESSAGE_PAGE || '416213b94be481a299a4e2829e32ad6d',
  project: process.env.NOTION_PROJECT_DB || '41c213b94be48119aa50cc35765b9d41',
  support: process.env.NOTION_SUPPORT_PAGE || '41c213b94be481d9a33ddab72e6eb62d',
}

export const notionEnabled = TOKEN !== ''
const notion = new Client({ auth: TOKEN || 'not-set' })

// ---- 小さな道具 ----
function plain(prop: any): string {
  if (!prop) return ''
  const list = prop.title || prop.rich_text || []
  return list.map((t: any) => t.plain_text).join('').trim()
}
function num(prop: any): number | null {
  return prop && typeof prop.number === 'number' ? prop.number : null
}
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// 「公開する」にチェックが入っている行をすべて読む
async function queryPublished(databaseId: string): Promise<any[]> {
  const rows: any[] = []
  let cursor: string | undefined = undefined
  do {
    const res: any = await notion.databases.query({
      database_id: databaseId,
      filter: { property: '公開する', checkbox: { equals: true } },
      start_cursor: cursor,
      page_size: 100,
    })
    rows.push(...res.results)
    cursor = res.has_more ? res.next_cursor : undefined
  } while (cursor)
  return rows
}

async function listBlocks(blockId: string): Promise<any[]> {
  const blocks: any[] = []
  let cursor: string | undefined = undefined
  do {
    const res: any = await notion.blocks.children.list({ block_id: blockId, start_cursor: cursor, page_size: 100 })
    blocks.push(...res.results)
    cursor = res.has_more ? res.next_cursor : undefined
  } while (cursor)
  return blocks
}

function richToHtml(rich: any[]): string {
  return (rich || [])
    .map((t: any) => {
      let s = esc(t.plain_text || '').replace(/\n/g, '<br>')
      if (t.annotations?.bold) s = `<strong>${s}</strong>`
      if (t.href && /^https?:\/\//.test(t.href)) s = `<a target="_blank" rel="noopener noreferrer" href="${esc(t.href)}">${s}</a>`
      return s
    })
    .join('')
}

function blocksToHtml(blocks: any[]): string {
  let html = ''
  let listTag = ''
  const closeList = () => {
    if (listTag) {
      html += `</${listTag}>`
      listTag = ''
    }
  }
  for (const b of blocks) {
    const data = b[b.type] || {}
    if (b.type === 'bulleted_list_item' || b.type === 'numbered_list_item') {
      const tag = b.type === 'bulleted_list_item' ? 'ul' : 'ol'
      if (listTag !== tag) {
        closeList()
        html += `<${tag}>`
        listTag = tag
      }
      html += `<li>${richToHtml(data.rich_text)}</li>`
      continue
    }
    closeList()
    if (b.type === 'paragraph') {
      const inner = richToHtml(data.rich_text)
      if (inner) html += `<p>${inner}</p>`
    } else if (b.type === 'heading_1' || b.type === 'heading_2' || b.type === 'heading_3') {
      html += `<h3>${richToHtml(data.rich_text)}</h3>`
    } else if (b.type === 'quote') {
      html += `<blockquote>${richToHtml(data.rich_text)}</blockquote>`
    } else if (b.type === 'image') {
      const url = data.type === 'external' ? data.external?.url : data.file?.url
      if (url) html += `<img src="${esc(url)}" alt="">`
    }
  }
  closeList()
  return html
}

// ---- メンバー ----
export async function getMembers(): Promise<Member[]> {
  if (!notionEnabled) return fallback.members
  try {
    const rows = await queryPublished(IDS.members)
    if (rows.length === 0) return fallback.members
    const members = rows.map((page: any): Member => {
      const p = page.properties
      const name = plain(p['氏名'])
      const backup = fallback.members.find((m) => m.name === name)
      const hasPhoto = (p['写真']?.files || []).length > 0
      return {
        id: page.id,
        name,
        title: plain(p['肩書き']),
        group: p['区分']?.select?.name || 'スタッフ',
        order: num(p['並び順']) ?? 999,
        bio: plain(p['紹介文']) || backup?.bio || '',
        photo: hasPhoto ? `/api/photo?id=${page.id}` : backup?.photo || null,
      }
    })
    return members.sort((a, b) => a.order - b.order)
  } catch (e) {
    console.error('メンバーの読み込みに失敗しました', e)
    return fallback.members
  }
}

// ---- お知らせ ----
function newsSlug(page: any): string {
  const old = page.properties['旧URL']?.url || ''
  const m = old.match(/(post-\d+)\.html/)
  return m ? m[1] : page.id.replace(/-/g, '')
}

export async function getNewsList(): Promise<NewsItem[]> {
  const backup = fallback.news.map(({ slug, date, title }) => ({ slug, date, title, pageId: null }))
  if (!notionEnabled) return backup
  try {
    const rows = await queryPublished(IDS.news)
    if (rows.length === 0) return backup
    const list = rows.map((page: any): NewsItem => ({
      slug: newsSlug(page),
      date: page.properties['日付']?.date?.start?.slice(0, 10) || '',
      title: plain(page.properties['タイトル']),
      pageId: page.id,
    }))
    return list.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (e) {
    console.error('お知らせの読み込みに失敗しました', e)
    return backup
  }
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const list = await getNewsList()
  const item = list.find((n) => n.slug === slug)
  if (!item) return null
  const backup = fallback.news.find((n) => n.slug === slug)
  let bodyHtml = ''
  if (item.pageId) {
    try {
      bodyHtml = blocksToHtml(await listBlocks(item.pageId))
    } catch (e) {
      console.error('お知らせ本文の読み込みに失敗しました', e)
    }
  }
  // Notion 側の本文が空のときは、旧サイトから移した本文を使います
  return { ...item, bodyHtml: bodyHtml || backup?.bodyHtml || '' }
}

// ---- 沿革 ----
export async function getHistory(): Promise<HistoryItem[]> {
  if (!notionEnabled) return fallback.history
  try {
    const rows = await queryPublished(IDS.history)
    if (rows.length === 0) return fallback.history
    const list = rows.map((page: any): HistoryItem => ({
      year: num(page.properties['年']) ?? 0,
      month: num(page.properties['月']),
      text: plain(page.properties['出来事']),
    }))
    return list.sort((a, b) => a.year - b.year || (a.month ?? 0) - (b.month ?? 0))
  } catch (e) {
    console.error('沿革の読み込みに失敗しました', e)
    return fallback.history
  }
}

// ---- 会社概要 ----
export async function getCompany(): Promise<CompanyRow[]> {
  if (!notionEnabled) return fallback.company
  try {
    const rows = await queryPublished(IDS.company)
    if (rows.length === 0) return fallback.company
    return rows
      .map((page: any) => ({
        label: plain(page.properties['項目']),
        value: plain(page.properties['内容']),
        order: num(page.properties['並び順']) ?? 999,
      }))
      .filter((r) => r.label !== 'お問い合わせ')
      .sort((a, b) => a.order - b.order)
      .map(({ label, value }) => ({ label, value }))
  } catch (e) {
    console.error('会社概要の読み込みに失敗しました', e)
    return fallback.company
  }
}

// ---- 代表メッセージ ----
// Notion のページは「説明 / 区切り線 / 本文 / 区切り線 / 署名」の順に書きます
export async function getMessage(): Promise<Message> {
  if (!notionEnabled) return fallback.message
  try {
    const blocks = await listBlocks(IDS.message)
    const parts: string[][] = [[]]
    for (const b of blocks) {
      if (b.type === 'divider') parts.push([])
      else if (b.type === 'paragraph') {
        const text = (b.paragraph.rich_text || []).map((t: any) => t.plain_text).join('').trim()
        if (text) parts[parts.length - 1].push(text)
      }
    }
    const body = parts.length >= 2 ? parts[1] : parts[0]
    const signature = parts.length >= 3 ? parts[2].join(' ') : fallback.message.signature
    if (body.length === 0) return fallback.message
    return { body, signature: signature || fallback.message.signature }
  } catch (e) {
    console.error('代表メッセージの読み込みに失敗しました', e)
    return fallback.message
  }
}

// ---- 事業内容 ----
// Notion の「事業内容」の表を読みます。ある「場所」の行が1つもないときは、控えの内容で補います
export async function getProject(): Promise<ProjectBlock[]> {
  if (!notionEnabled) return fallback.project
  try {
    const rows = await queryPublished(IDS.project)
    const list = rows
      .map((page: any): ProjectBlock => {
        const p = page.properties
        const href = (p['リンク先']?.url || '').trim()
        return {
          place: p['場所']?.select?.name || '',
          heading: plain(p['見出し']),
          sub: plain(p['小見出し']),
          name: plain(p['事業名']),
          text: plain(p['説明文']),
          items: plain(p['項目'])
            .split('\n')
            .map((t) => t.trim())
            .filter(Boolean),
          href: /^(https?:\/\/|\/)/.test(href) ? href : null,
          linkLabel: plain(p['リンクの文字']),
          preparing: p['準備中']?.checkbox === true,
          order: num(p['並び順']) ?? 999,
        }
      })
      .filter((b) => b.place && b.heading)
    const places = ['はじめの文', 'さとのば大学', 'タイル', 'LLLC', 'サポーター']
    const merged = places.flatMap((place) => {
      const fromNotion = list.filter((b) => b.place === place)
      return fromNotion.length > 0 ? fromNotion : fallback.project.filter((b) => b.place === place)
    })
    return merged.sort((a, b) => a.order - b.order)
  } catch (e) {
    console.error('事業内容の読み込みに失敗しました', e)
    return fallback.project
  }
}

// ---- その他のご支援のかたち ----
// Notion のページは「説明 / 区切り線 / 本文」の順に書きます（線より下がサイトに出ます）
export async function getSupportHtml(): Promise<string> {
  if (!notionEnabled) return fallback.support.bodyHtml
  try {
    const blocks = await listBlocks(IDS.support)
    const line = blocks.findIndex((b) => b.type === 'divider')
    const html = blocksToHtml(line >= 0 ? blocks.slice(line + 1) : blocks)
    return html || fallback.support.bodyHtml
  } catch (e) {
    console.error('「その他のご支援のかたち」の読み込みに失敗しました', e)
    return fallback.support.bodyHtml
  }
}

// ---- 共創オーナー ----
export async function getOwners(): Promise<Owner[]> {
  if (!notionEnabled) return fallback.owners
  try {
    const rows = await queryPublished(IDS.owners)
    return rows
      .map((page: any) => ({
        name: plain(page.properties['お名前']),
        title: plain(page.properties['肩書き']),
        order: num(page.properties['並び順']) ?? 9999,
      }))
      .filter((o) => o.name)
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, 'ja'))
      .map(({ name, title }) => ({ name, title }))
  } catch (e) {
    console.error('共創オーナーの読み込みに失敗しました', e)
    return fallback.owners
  }
}

// ---- メンバー写真（Notion の画像は約1時間で期限が切れるため、都度あたらしい場所を調べます）----
export async function getMemberPhotoUrl(pageId: string): Promise<string | null> {
  if (!notionEnabled) return null
  const page: any = await notion.pages.retrieve({ page_id: pageId })
  const file = page.properties?.['写真']?.files?.[0]
  if (!file) return null
  return file.type === 'external' ? file.external.url : file.file.url
}

// 2026-12-01 → 2026年12月01日
export function formatDate(date: string): string {
  const m = (date || '').match(/^(\d{4})-(\d{2})-(\d{2})/)
  return m ? `${m[1]}年${m[2]}月${m[3]}日` : ''
}
