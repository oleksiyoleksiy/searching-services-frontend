import React from 'react'
import { Link } from 'react-router-dom'

interface CategoryCardProps {
  icon: React.ReactNode
  title: string
  providersCount: number
  color: string
  to: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  providersCount,
  color,
  to,
}) => {
  return (
    <Link to={to} className="group block">
      <div
        className={`
        p-4 rounded-xl flex flex-col items-center justify-center text-center 
        h-32 transition-all duration-300 bg-opacity-10 hover:bg-opacity-20
        ${color}
      `}
      >
        <div className="mb-2 text-gray-800">{icon}</div>
        <h3 className="font-medium text-gray-800 group-hover:text-localfind-700 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{providersCount} providers</p>
      </div>
    </Link>
  )
}

export default CategoryCard
