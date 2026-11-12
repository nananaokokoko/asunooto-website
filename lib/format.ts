// 2026-12-01 → 2026年12月01日
export function formatDate(date: string): string {
  const m = (date || '').match(/^(\d{4})-(\d{2})-(\d{2})/)
  return m ? `${m[1]}年${m[2]}月${m[3]}日` : ''
}
