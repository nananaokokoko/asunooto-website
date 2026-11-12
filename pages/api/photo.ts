// メンバー写真を Notion から取り出して表示するための窓口です
import type { NextApiRequest, NextApiResponse } from 'next'
import { getMemberPhotoUrl } from '../../lib/notion'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id || '')
  if (!/^[0-9a-f-]{32,36}$/i.test(id)) {
    res.status(400).end()
    return
  }
  try {
    const url = await getMemberPhotoUrl(id)
    if (!url) {
      res.status(404).end()
      return
    }
    res.setHeader('Cache-Control', 'public, s-maxage=1800, max-age=600')
    res.redirect(302, url)
  } catch (e) {
    res.status(404).end()
  }
}
