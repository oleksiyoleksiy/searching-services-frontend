import NavigateSetter from '@/utils/NavigateSetter'
import { Outlet } from 'react-router-dom'
import { Toaster as Sonner } from '@/components/ui/sonner'
function RootLayout() {
  return (
    <>
      <NavigateSetter />
      <Sonner />
      <Outlet />
    </>
  )
}

export default RootLayout
