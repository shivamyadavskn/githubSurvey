import { Button } from "@/components/ui/button";

export default function Pagination({ page, totalPages, handlePageChange }) {
  return (
    <div className="flex justify-center gap-2 py-4">
      <Button
        variant="outline"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 0}
      >
        Previous
      </Button>
      <span className="text-sm text-gray-500">
        Page {page + 1} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => handlePageChange(page + 1)}
        disabled={page + 1 >= totalPages}
      >
        Next
      </Button>
    </div>
  );
}
