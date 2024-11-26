import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchInterface() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "hello");
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "stories",
    sortBy: searchParams.get("sortBy") || "popularity",
    timeRange: searchParams.get("timeRange") || "all",
    page: parseInt(searchParams.get("page") || 0, 10),
  });
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch data whenever filters, query, or page change
  useEffect(() => {
    const fetchResults = async () => {
      const baseUrl = "http://hn.algolia.com/api/v1/search";
      const sortUrl =
        filters.sortBy === "date"
          ? "http://hn.algolia.com/api/v1/search_by_date"
          : baseUrl;

      const tags = filters.type === "stories" ? "story" : "comment";
      const timeFilter =
        filters.timeRange !== "all"
          ? `&numericFilters=created_at_i>${getTimeRange(filters.timeRange)}`
          : "";

      const url = `${sortUrl}?query=${query}&tags=${tags}${timeFilter}&page=${filters.page}`;
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.hits || []);
      setTotalPages(data.nbPages || 0);
    };

    fetchResults();
  }, [query, filters]);

  // Helper to calculate time range in seconds
  const getTimeRange = (range) => {
    const now = Math.floor(Date.now() / 1000);
    switch (range) {
      case "day":
        return now - 24 * 60 * 60;
      case "week":
        return now - 7 * 24 * 60 * 60;
      case "month":
        return now - 30 * 24 * 60 * 60;
      case "year":
        return now - 365 * 24 * 60 * 60;
      default:
        return 0;
    }
  };

  // Update filters and URL
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 0 })); // Reset to page 0 on filter change
    const newParams = {
      query,
      ...filters,
      [key]: value,
      page: 0,
    };
    setSearchParams(newParams);
  };

  // Handle search query change
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchParams({ query: e.target.value, ...filters, page: 0 });
  };

  // Handle page navigation
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    setSearchParams({ query, ...filters, page: newPage });
  };

  return (
    <div className="min-h-screen bg-[#f6f6ef]">
      {/* Header */}
      <header className="bg-[#ff6600] p-2">
        <div className="container mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-[#ff6600] font-bold">
              H
            </div>
            <span className="font-semibold text-white">Search Hacker News</span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="search"
                placeholder="Search stories..."
                value={query}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              Search by
              <img src="/algolia-white.svg" alt="Algolia" className="h-4" />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#ff7700]">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Search Controls */}
      <div className="border-b bg-white">
        <div className="container mx-auto flex items-center gap-4 p-2">
          <span className="text-sm">Search</span>
          <Select
            defaultValue={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stories">Stories</SelectItem>
              <SelectItem value="comments">Comments</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm">by</span>
          <Select
            defaultValue={filters.sortBy}
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm">for</span>
          <Select
            defaultValue={filters.timeRange}
            onValueChange={(value) => handleFilterChange("timeRange", value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="day">Last 24h</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-sm text-gray-500">
            {results.length} results
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="container mx-auto py-4">
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.objectID} className="space-y-1">
              <div className="flex items-baseline gap-2">
                <h2 className="text-base">
                  <a href={result.url} className="hover:underline">
                    {result.title}
                  </a>
                </h2>
                {result.url && (
                  <span className="text-sm text-gray-500">({result.url})</span>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {result.points} points | {result.author} |{" "}
                {new Date(result.created_at).toLocaleString()} |{" "}
                {result.num_comments} comments
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 py-4">
        <Button
          variant="outline"
          onClick={() => handlePageChange(filters.page - 1)}
          disabled={filters.page === 0}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-500">
          Page {filters.page + 1} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => handlePageChange(filters.page + 1)}
          disabled={filters.page + 1 >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
