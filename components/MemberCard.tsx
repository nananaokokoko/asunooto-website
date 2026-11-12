import React from 'react'
import type { Member } from '../lib/notion'

export default function MemberCard({ member, small }: { member: Member; small?: boolean }) {
  return (
    <article className={small ? 'member member-small' : 'member'}>
      <div className="member-photo">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.photo} alt={`${member.name}の写真`} loading="lazy" />
        ) : (
          <span aria-hidden="true">{member.name.slice(0, 1)}</span>
        )}
      </div>
      <div className="member-text">
        <h4>{member.name}</h4>
        <p className="member-title">{member.title}</p>
        {member.bio && (
          <details>
            <summary>プロフィールを読む</summary>
            <p className="member-bio">{member.bio}</p>
          </details>
        )}
      </div>
    </article>
  )
}
