
import { Button } from "@/components/ui/button";

const Pagination = (page, totalPages, onPageChange ) => {
  const isFirstPage = page === 0;
  const isLastPage = page === totalPages - 1;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <Button
        onClick={handlePrevious}
        disabled={isFirstPage}
        variant="outline"
        className={`${
          isFirstPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Previous
      </Button>
      <span className="text-sm font-medium">
        Page {page + 1} of {totalPages}
      </span>
      <Button
        onClick={handleNext}
        disabled={isLastPage}
        variant="outline"
        className={`${
          isLastPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
