import { PaginationData } from '@/types'
import React from 'react'
import { Button } from './button'
import { useSearchParams } from 'react-router-dom'

interface PaginationProps {
  paginationData?: PaginationData
}

function Pagination({ paginationData }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleNextButtonClick = () => {
    if (!paginationData?.links.next) return

    const params = new URLSearchParams(searchParams);

    params.set('page', String(Number(searchParams.get('page') || 1) + 1))

    setSearchParams(params)
  }

  const handlePrevButtonClick = () => {
    if (!paginationData?.links.prev) return

    const params = new URLSearchParams(searchParams);

    params.set('page', String(Number(searchParams.get('page') || 1) - 1))

    setSearchParams(params)
  }

  return <div className="flex items-center justify-between mt-4">
    <p className="text-sm text-gray-500">
      Showing <strong>{paginationData?.meta.current_page}</strong> of <strong>{paginationData?.meta.last_page}</strong> users
    </p>
    <div className="flex gap-2">
      <Button onClick={handlePrevButtonClick} variant="outline" size="sm" disabled={!paginationData?.links.prev}>
        Previous
      </Button>
      <Button onClick={handleNextButtonClick} variant="outline" size="sm" disabled={!paginationData?.links.next}>
        Next
      </Button>
    </div>
  </div>
}

export default Pagination