import React from 'react'
import { Member } from '../lib/notion'

interface MemberCardProps {
  member: Member
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  // 役職に応じた色を設定
  const getRoleColor = (role: string) => {
    switch (role) {
      case '経営':
        return 'bg-gradient-to-br from-blue-500 to-purple-600'
      case '企画':
        return 'bg-gradient-to-br from-pink-500 to-orange-600'
      case '運営':
        return 'bg-gradient-to-br from-green-500 to-teal-600'
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* 顔写真 */}
        <div className="flex justify-center mb-4">
          {member.imageUrl ? (
            <img 
              src={member.imageUrl} 
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 group-hover:border-blue-100 transition-colors"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* 名前 */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          {member.name}
        </h3>
        
        {/* 肩書き */}
        {member.title && (
          <p className="text-gray-600 text-center text-sm mb-3">
            {member.title}
          </p>
        )}
        
        {/* 役職バッジ */}
        {member.role && (
          <div className="flex justify-center mb-4">
            <span className={`${getRoleColor(member.role)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
              {member.role}
            </span>
          </div>
        )}
        
        {/* 説明 */}
        {member.description && (
          <p className="text-gray-700 text-sm leading-relaxed">
            {member.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default MemberCard
