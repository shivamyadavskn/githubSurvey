import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SearchControl = (filters, onFilterChange) => {
  const handleSelectChange = (key, value) => {
    onFilterChange(key, value);
  };

  return (
    <div className="border-b bg-white">
      <div className="container mx-auto flex items-center gap-4 p-2">
        <span className="text-sm">Search</span>
        <Select value={filters.type} onValueChange={(value) => handleSelectChange("type", value)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stories">Stories</SelectItem>
            <SelectItem value="comments">Comments</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm">by</span>
        <Select value={filters.sortBy} onValueChange={(value) => handleSelectChange("sortBy", value)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm">for</span>
        <Select value={filters.timeRange} onValueChange={(value) => handleSelectChange("timeRange", value)}>
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
          20,483 results (0.006 seconds)
        </div>
      </div>
    </div>
  );
};

export default SearchControl;
