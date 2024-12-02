import React, { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function AdvancedPagination({
  page,
  totalPages,
  handlePageChange,
}) {
  // Calculate the range of page numbers to display
  const paginationRange = useMemo(() => {
    // Initial visible pages constant
    const visiblePagesCount = 6;

    // Calculate start and end pages dynamically
    let startPage = 0;
    let endPage = Math.min(totalPages, visiblePagesCount);

    // Adjust range based on current page
    if (page >= visiblePagesCount - 1) {
      // As page increases, shift the window
      startPage = page - (visiblePagesCount - 2);
      endPage = Math.min(page + 3, totalPages);
    }

    // Generate an array of page numbers to display
    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  }, [page, totalPages]);

  // Handle Previous - go to previous page
  const handlePrevious = () => {
    if (page > 0) {
      handlePageChange(page - 1);
    }
  };

  // Handle Next - go to next page
  const handleNext = () => {
    if (page < totalPages - 1) {
      handlePageChange(page + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button - always shows after first page */}
        {page > 0 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-left">
                <path d="m11 17-5-5 5-5"/>
                <path d="m18 17-5-5 5-5"/>
              </svg>
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Page Number Buttons */}
        {paginationRange.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href="#"
              isActive={pageNum === page}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(pageNum);
              }}
            >
              {pageNum + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button - shows if not on last page */}
        {page < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-right">
                <path d="m6 17 5-5-5-5"/>
                <path d="m13 17 5-5-5-5"/>
              </svg>
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}