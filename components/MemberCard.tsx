import React from 'react'
import { Member } from '../lib/notion'

interface MemberCardProps {
  member: Member
  delay?: number
}

export default function MemberCard({ member, delay = 0 }: MemberCardProps) {
  return (
    <div 
      className={`member-card p-6 animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col h-full">
        {/* 役職バッジ */}
        {member.role && (
          <span className="inline-block self-start px-3 py-1 bg-asunooto-light text-asunooto-blue text-xs font-medium rounded-full mb-3">
            {member.role}
          </span>
        )}
        
        {/* 名前 */}
        <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
          {member.name}
        </h3>
        
        {/* 肩書き */}
        <p className="text-sm text-gray-600 mb-4 font-medium">
          {member.title}
        </p>
        
        {/* 説明 */}
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-6 flex-grow">
          {member.description}
        </p>
      </div>
    </div>
  )
}
