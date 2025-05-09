import NavigateSetter from '@/utils/NavigateSetter'
import { Outlet } from 'react-router-dom'
import { Toaster as Sonner } from '@/components/ui/sonner'
import FetchUser from '@/utils/FetchUser'
function RootLayout() {
  return (
    <>
      <NavigateSetter />
      <FetchUser />
      <Sonner />
      <Outlet />
    </>
  )
}

export default RootLayout
