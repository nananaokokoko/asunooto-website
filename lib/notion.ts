import { Client } from '@notionhq/client'

// Notion APIクライアントの初期化
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

// データベースIDの設定
const MEMBERS_DATABASE_ID = process.env.NOTION_MEMBERS_DATABASE_ID || ''
const NEWS_DATABASE_ID = process.env.NOTION_NEWS_DATABASE_ID || ''
const HISTORY_DATABASE_ID = process.env.NOTION_HISTORY_DATABASE_ID || ''

// メンバー情報の型定義
export interface Member {
  id: string
  name: string
  title: string
  role: string
  description: string
  order: number
}

// ニュース情報の型定義
export interface News {
  id: string
  title: string
  date: string
  content: string
  category: string
  url?: string | null
}

// 沿革情報の型定義
export interface History {
  id: string
  year: string
  month?: string | null
  event: string
  order: number
}

// プロパティ値を安全に取得する関数
function getPropertyValue(property: any, type: string): any {
  if (!property) return null
  
  switch (type) {
    case 'title':
      return property.title?.[0]?.plain_text || ''
    case 'rich_text':
      return property.rich_text?.[0]?.plain_text || ''
    case 'select':
      return property.select?.name || ''
    case 'number':
      return property.number || 0
    case 'date':
      return property.date?.start || ''
    case 'url':
      return property.url || null  // undefinedではなくnullを返す
    default:
      return null
  }
}

// メンバー情報を取得
export async function getMembers(): Promise<Member[]> {
  try {
    if (!MEMBERS_DATABASE_ID) {
      console.warn('NOTION_MEMBERS_DATABASE_ID is not set')
      return getDummyMembers()
    }

    const response = await notion.databases.query({
      database_id: MEMBERS_DATABASE_ID,
      sorts: [
        {
          property: '順序',
          direction: 'ascending',
        },
      ],
    })

    return response.results.map((page: any) => ({
      id: page.id,
      name: getPropertyValue(page.properties['名前'], 'title'),
      title: getPropertyValue(page.properties['肩書き'], 'rich_text'),
      role: getPropertyValue(page.properties['役職'], 'select'),
      description: getPropertyValue(page.properties['説明'], 'rich_text'),
      order: getPropertyValue(page.properties['順序'], 'number'),
    }))
  } catch (error) {
    console.error('Error fetching members:', error)
    return getDummyMembers()
  }
}

// ニュース情報を取得
export async function getNews(): Promise<News[]> {
  try {
    if (!NEWS_DATABASE_ID) {
      console.warn('NOTION_NEWS_DATABASE_ID is not set')
      return getDummyNews()
    }

    const response = await notion.databases.query({
      database_id: NEWS_DATABASE_ID,
      sorts: [
        {
          property: '日付',
          direction: 'descending',
        },
      ],
    })

    return response.results.map((page: any) => ({
      id: page.id,
      title: getPropertyValue(page.properties['タイトル'], 'title'),
      date: getPropertyValue(page.properties['日付'], 'date'),
      content: getPropertyValue(page.properties['内容'], 'rich_text'),
      category: getPropertyValue(page.properties['カテゴリ'], 'select'),
      url: getPropertyValue(page.properties['URL'], 'url'),
    }))
  } catch (error) {
    console.error('Error fetching news:', error)
    return getDummyNews()
  }
}

// 沿革情報を取得
export async function getHistory(): Promise<History[]> {
  try {
    if (!HISTORY_DATABASE_ID) {
      console.warn('NOTION_HISTORY_DATABASE_ID is not set')
      return getDummyHistory()
    }

    const response = await notion.databases.query({
      database_id: HISTORY_DATABASE_ID,
      sorts: [
        {
          property: '順序',
          direction: 'ascending',
        },
      ],
    })

    return response.results.map((page: any) => ({
      id: page.id,
      year: getPropertyValue(page.properties['年'], 'rich_text'),
      month: getPropertyValue(page.properties['月'], 'rich_text'),
      event: getPropertyValue(page.properties['出来事'], 'title'),
      order: getPropertyValue(page.properties['順序'], 'number'),
    }))
  } catch (error) {
    console.error('Error fetching history:', error)
    return getDummyHistory()
  }
}

// ダミーデータ（Notion未設定時用）
function getDummyMembers(): Member[] {
  return [
    {
      id: '1',
      name: '山田 太郎',
      title: '代表取締役',
      role: '経営',
      description: '「さとのば大学」の創設者。地域と都市をつなぐ新しい教育の形を追求しています。',
      order: 1,
    },
    {
      id: '2',
      name: '佐藤 花子',
      title: 'プログラムディレクター',
      role: '企画',
      description: '地域プロジェクトの企画・運営を担当。学生たちの成長を支えています。',
      order: 2,
    },
    {
      id: '3',
      name: '鈴木 一郎',
      title: 'コミュニティマネージャー',
      role: '運営',
      description: '地域との関係構築を担当。持続可能なコミュニティづくりに取り組んでいます。',
      order: 3,
    },
  ]
}

function getDummyNews(): News[] {
  return [
    {
      id: '1',
      title: '2024年度「さとのば大学」入学式を開催しました',
      date: '2024-04-01',
      content: '新入生20名を迎え、新年度がスタートしました。今年度も地域と共に学びを深めていきます。',
      category: 'お知らせ',
      url: null,
    },
    {
      id: '2',
      title: '岡山県真庭市との連携協定を締結',
      date: '2024-03-15',
      content: '持続可能な地域づくりに向けて、真庭市と包括的な連携協定を締結しました。',
      category: '組織',
      url: null,
    },
    {
      id: '3',
      title: '地域プロジェクト成果発表会を開催',
      date: '2024-02-28',
      content: '学生たちが1年間取り組んだプロジェクトの成果を地域の皆様に発表しました。',
      category: 'イベント',
      url: null,
    },
  ]
}

function getDummyHistory(): History[] {
  return [
    {
      id: '1',
      year: '2015',
      month: '4月',
      event: '株式会社アスノオト創業',
      order: 1,
    },
    {
      id: '2',
      year: '2018',
      month: '9月',
      event: '「さとのば大学」プロジェクト開始',
      order: 2,
    },
    {
      id: '3',
      year: '2019',
      month: '4月',
      event: '「さとのば大学」第1期生入学',
      order: 3,
    },
    {
      id: '4',
      year: '2020',
      month: null,
      event: 'オンラインプログラム開始',
      order: 4,
    },
    {
      id: '5',
      year: '2023',
      month: '10月',
      event: '創業8周年記念イベント開催',
      order: 5,
    },
  ]
}
