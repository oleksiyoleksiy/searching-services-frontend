// src/utils/NavigateSetter.tsx
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { setNavigate } from '@/navigate'

export default function NavigateSetter() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setNavigate(navigate)
  }, [navigate])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  return null
}
