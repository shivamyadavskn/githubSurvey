import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "./Header/Header";
import SearchControls from "./SearchControl/SearchControl";
import Results from "./SearchResult/SearchResult";
import Pagination from "./Pagination/Pagination";

export default function SearchInterface() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "stories",
    sortBy: searchParams.get("sortBy") || "popularity",
    timeRange: searchParams.get("timeRange") || "all",
    page: parseInt(searchParams.get("page") || 0, 10),
  });
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [responseTiming, setResponseTiming] = useState(0);
  const[noofhits, setNooffilters] = useState(0);

  const filterTypeList = ["stories", "comment", "ask_hn","poll","show_hn","launch_hn","job"];

  useEffect(() => {
    const fetchResults = async () => {
      const baseUrl = "https://hn.algolia.com/api/v1/search";
      const sortUrl =
        filters.sortBy === "date"
          ? "https://hn.algolia.com/api/v1/search_by_date"
          : baseUrl;

      const tags =
        filters.type === "stories"
          ? "story"
          : filterTypeList.includes(filters.type)
          ? filters.type
          : null;

      const timeFilter =
        filters.timeRange !== "all"
          ? `&numericFilters=created_at_i>${getTimeRange(filters.timeRange)}`
          : "";

      const url = `${sortUrl}?query=${encodeURIComponent(
        query
      )}&tags=${tags}${timeFilter}&page=${filters.page}`;

      const response = await fetch(url);
      const data = await response.json();
      setResponseTiming(data?.processingTimeMS + data?.serverTimeMS);
      setNooffilters(data.nbHits);
      setResults(data.hits || []);
      setTotalPages(data.nbPages || 0);
    };

    fetchResults();
  }, [query, filters]);

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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 0 }));
    const newParams = {
      query,
      ...filters,
      [key]: value,
      page: 0,
    };
    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchParams({ query: e.target.value, ...filters, page: 0 });
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    setSearchParams({ query, ...filters, page: newPage });
  };

  return (
    <div className="min-h-screen bg-[#f6f6ef]">
      <Header query={query} handleSearch={handleSearch} />
      <SearchControls
        filters={filters}
        handleFilterChange={handleFilterChange}
        results={results}
        responseTiming={responseTiming}
        noofhits={noofhits}
      />
      <Results results={results} filtertypes={filters.type} />
      <Pagination
        page={filters.page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
