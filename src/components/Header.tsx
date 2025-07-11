import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, X, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { hasPermission } from '@/utils/permissions'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import SearchBar from '@/components/SearchBar'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isLoading } = useSelector((s: RootState) => s.auth)
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const navigate = useNavigate()

  if (isLoading) return null

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-localfind-600 to-localfind-500 bg-clip-text text-transparent">
              LocalFind
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-localfind-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/categories"
            className="text-gray-600 hover:text-localfind-600 transition-colors"
          >
            Categories
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-localfind-600 transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchModalOpen(true)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          {user ? <Link to={hasPermission('admin', user) ? '/admin/dashboard' : hasPermission('provider', user) ? '/provider/dashboard' : '/user/dashboard'}>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link> : <Link to="/auth/login">
            <Button
              variant="default"
              className="bg-localfind-600 hover:bg-localfind-700"
            >
              Log in
            </Button>
          </Link>}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <Link
              to="/"
              className="block py-2 text-gray-600 hover:text-localfind-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="block py-2 text-gray-600 hover:text-localfind-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>

            <Link
              to="/about"
              className="block py-2 text-gray-600 hover:text-localfind-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {user ? <Link to={hasPermission('admin', user) ? '/admin/dashboard' : hasPermission('provider', user) ? '/provider/dashboard' : '/user/dashboard'}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link> :
              <div className="pt-2 flex space-x-2">
                <Link to="/auth/register" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Button>
                </Link>
                <Link to="/auth/login" className="w-full">
                  <Button
                    variant="default"
                    className="w-full bg-localfind-600 hover:bg-localfind-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Button>
                </Link>
              </div>
            }
          </div>
        </div>
      )}

      <Dialog open={searchModalOpen} onOpenChange={setSearchModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-center">Search LocalFind</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <SearchBar simplified={true} onSearch={(search, postalCode) => {
              setSearchModalOpen(false);
              navigate(`/search?${search ? `search=${search}` : ''}&${postalCode ? `postalCode=${postalCode}` : ''}`)
            }} />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default Header
