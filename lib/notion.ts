import { Client } from '@notionhq/client'

// Notion APIクライアントの初期化
// 環境変数から取得（.env.localファイルに設定）
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

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
  url?: string
}

// 沿革情報の型定義
export interface History {
  id: string
  year: string
  month?: string
  event: string
  order: number
}

// 沿革情報の型定義
export interface History {
  id: string
  year: string
  month?: string
  content: string
  order: number
}

// メンバー情報を取得
export async function getMembers(): Promise<Member[]> {
  if (!process.env.NOTION_MEMBERS_DATABASE_ID) {
    // Notion未設定の場合はダミーデータを返す
    return getDummyMembers()
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_MEMBERS_DATABASE_ID,
      sorts: [
        {
          property: '順序',
          direction: 'ascending',
        },
      ],
    })

    return response.results.map((page: any) => ({
      id: page.id,
      name: page.properties['名前']?.title?.[0]?.plain_text || '',
      title: page.properties['肩書き']?.rich_text?.[0]?.plain_text || '',
      role: page.properties['役職']?.select?.name || '',
      description: page.properties['説明']?.rich_text?.[0]?.plain_text || '',
      order: page.properties['順序']?.number || 999,
    }))
  } catch (error) {
    console.error('Failed to fetch members from Notion:', error)
    return getDummyMembers()
  }
}

// ニュース情報を取得
export async function getNews(): Promise<News[]> {
  if (!process.env.NOTION_NEWS_DATABASE_ID) {
    // Notion未設定の場合はダミーデータを返す
    return getDummyNews()
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_NEWS_DATABASE_ID,
      sorts: [
        {
          property: '日付',
          direction: 'descending',
        },
      ],
      page_size: 10, // 最新10件を取得
    })

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties['タイトル']?.title?.[0]?.plain_text || '',
      date: page.properties['日付']?.date?.start || '',
      content: page.properties['内容']?.rich_text?.[0]?.plain_text || '',
      category: page.properties['カテゴリ']?.select?.name || 'お知らせ',
      url: page.properties['URL']?.url || undefined,
    }))
  } catch (error) {
    console.error('Failed to fetch news from Notion:', error)
    return getDummyNews()
  }
}

// 沿革情報を取得
export async function getHistory(): Promise<History[]> {
  if (!process.env.NOTION_HISTORY_DATABASE_ID) {
    // Notion未設定の場合はダミーデータを返す
    return getDummyHistory()
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_HISTORY_DATABASE_ID,
      sorts: [
        {
          property: '順序',
          direction: 'ascending',
        },
      ],
    })

    return response.results.map((page: any) => ({
      id: page.id,
      year: page.properties['年']?.rich_text?.[0]?.plain_text || '',
      month: page.properties['月']?.rich_text?.[0]?.plain_text || '',
      event: page.properties['出来事']?.title?.[0]?.plain_text || '',
      order: page.properties['順序']?.number || 999,
    }))
  } catch (error) {
    console.error('Failed to fetch history from Notion:', error)
    return getDummyHistory()
  }
}

// 沿革情報を取得
export async function getHistory(): Promise<History[]> {
  if (!process.env.NOTION_HISTORY_DATABASE_ID) {
    // Notion未設定の場合はダミーデータを返す
    return getDummyHistory()
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_HISTORY_DATABASE_ID,
      sorts: [
        {
          property: '順序',
          direction: 'descending',
        },
      ],
    })

    return response.results.map((page: any) => ({
      id: page.id,
      year: page.properties['年']?.title?.[0]?.plain_text || '',
      month: page.properties['月']?.rich_text?.[0]?.plain_text || '',
      content: page.properties['内容']?.rich_text?.[0]?.plain_text || '',
      order: page.properties['順序']?.number || 0,
    }))
  } catch (error) {
    console.error('Failed to fetch history from Notion:', error)
    return getDummyHistory()
  }
}

// ダミーデータ（Notion未設定時用）
function getDummyMembers(): Member[] {
  return [
    {
      id: '1',
      name: '信岡 良亮',
      title: '代表取締役／さとのば大学 理事長（発起人）',
      role: '代表取締役',
      description: '1982年生まれ。関西で生まれ育ち同志社大学卒業後、東京でITベンチャー企業に就職。2015年、株式会社アスノオト創業。',
      order: 1,
    },
    {
      id: '2',
      name: '兼松 佳宏',
      title: '取締役／さとのば大学 学長（カリキュラム担当）',
      role: '取締役',
      description: '1979年生まれ。ウェブデザイナーとしてNPO支援に関わりながら、greenz.jpの立ち上げに関わり、10年から15年まで編集長。',
      order: 2,
    },
    {
      id: '3',
      name: '黒井 理恵',
      title: '取締役',
      role: '取締役',
      description: '北海道名寄市出身・在住。さとのば大学では名寄地域事務局として関わりつつ、共創オーナーズコミュニティのマネージャーを務める。',
      order: 3,
    },
    {
      id: '4',
      name: '武井 浩三',
      title: '監査役',
      role: '監査役',
      description: '高校を卒業後、ミュージシャンを志し渡米。2007年に不動産関連のIT企業を設立、独自の「管理をしないマネジメント」が注目を集める。',
      order: 4,
    },
  ]
}

function getDummyNews(): News[] {
  return [
    {
      id: '1',
      title: 'さとのば大学 2025年度春入学の募集を開始しました',
      date: '2025-01-15',
      content: '2025年度春入学（4月入学）の募集を開始いたしました。オンライン説明会も随時開催しております。',
      category: 'お知らせ',
      url: 'https://satonoba.org',
    },
    {
      id: '2',
      title: '新メンバーが加わりました',
      date: '2025-01-10',
      content: 'さとのば大学事業部に新たなメンバーが加わりました。',
      category: '組織',
    },
    {
      id: '3',
      title: '年末年始休業のお知らせ',
      date: '2024-12-20',
      content: '12月29日から1月3日まで年末年始休業とさせていただきます。',
      category: 'お知らせ',
    },
  ]
}

function getDummyHistory(): History[] {
  return [
    {
      id: '1',
      year: '2007',
      month: '6月',
      event: '信岡良亮が東京のITベンチャー企業を退社',
      order: 1,
    },
    {
      id: '2',
      year: '2007',
      month: '',
      event: '島根県海士町へ移住',
      order: 2,
    },
    {
      id: '3',
      year: '2008',
      month: '',
      event: '株式会社巡の環を共同創業',
      order: 3,
    },
    {
      id: '4',
      year: '2014',
      month: '5月',
      event: '東京に活動拠点を移す',
      order: 4,
    },
    {
      id: '5',
      year: '2015',
      month: '',
      event: '株式会社アスノオト創業',
      order: 5,
    },
    {
      id: '6',
      year: '2017',
      month: '',
      event: 'さとのば大学プロジェクト開始',
      order: 6,
    },
    {
      id: '7',
      year: '2019',
      month: '4月',
      event: 'さとのば大学第1期生入学',
      order: 7,
    },
    {
      id: '8',
      year: '2023',
      month: '',
      event: 'さとのば大学5周年',
      order: 8,
    },
  ]
}

function getDummyHistory(): History[] {
  return [
    {
      id: '1',
      year: '2015',
      month: '',
      content: '株式会社アスノオト創業。島根県海士町での活動で知られる株式会社風と土と（旧：株式会社巡の環）の共同創業者である信岡良亮が、地域と都市の新しい関係作りのために創業',
      order: 1,
    },
    {
      id: '2',
      year: '2016',
      month: '',
      content: '地域共創カレッジを開始。先進5地域（西粟倉村、神山町、上勝町、海士町、女川町）と連携した人材育成プロジェクト',
      order: 2,
    },
    {
      id: '3',
      year: '2019',
      month: '',
      content: 'さとのば大学を開校。地域を巡りながら仲間と学び合う新しい大学の形を提案',
      order: 3,
    },
    {
      id: '4',
      year: '2021',
      month: '4',
      content: '新潟産業大学と連携し「さとまなプログラム」を開講。文部科学省認定校との教育プログラム連携',
      order: 4,
    },
    {
      id: '5',
      year: '2021',
      month: '9',
      content: '小林和彦氏が社外取締役に就任。地域連携・ネットワーク強化へ',
      order: 5,
    },
  ]
}

export { notion }
