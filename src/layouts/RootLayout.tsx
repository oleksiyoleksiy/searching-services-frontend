import { setNavigate } from '@/navigate'
import NavigateSetter from '@/utils/NavigateSetter'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

function RootLayout() {
  return (
    <>
      <NavigateSetter />
      <Outlet />
    </>
  )
}

export default RootLayout
