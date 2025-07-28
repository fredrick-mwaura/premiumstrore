import React, { useState } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination"

type PaginateProps = {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Paginate = ({ totalPages, currentPage, onPageChange }: PaginateProps) => {
  const [currentPageState, setCurrentPageState] = useState(currentPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPageState(page)
      onPageChange(page)
    }
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <Pagination>
      <PaginationPrevious
        currentPage={currentPageState}  // Pass currentPage state
        onClick={() => handlePageChange(currentPageState - 1)}  // Handle page change
      />

      <PaginationContent>
        {currentPageState > 3 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
          </>
        )}
        {pages
          .slice(Math.max(currentPageState - 2, 0), currentPageState + 1)
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPageState}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        {currentPageState < totalPages - 2 && (
          <>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
      </PaginationContent>
      <PaginationNext
        currentPage={currentPageState}  // Pass currentPage state
        totalPages={totalPages}  // Pass totalPages
        onClick={() => handlePageChange(currentPageState + 1)}  // Handle page change
      />

    </Pagination>
  )
}

export default Paginate
