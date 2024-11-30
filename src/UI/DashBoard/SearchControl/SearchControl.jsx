import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchControls({
  filters,
  handleFilterChange,
  results,
  responseTiming,
  noofhits,
}) {
  return (
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
            <SelectItem value="comment">Comments</SelectItem>
            <SelectItem value="ask_hn">Ask Hn</SelectItem>
            <SelectItem value="poll">Poll</SelectItem>
            <SelectItem value="show_hn">Show Hn</SelectItem>
            <SelectItem value="launch_hn">Launch Hn</SelectItem>
            <SelectItem value="job">Job</SelectItem>
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
        <div className="ml-auto text-lg text-black-600">
          {noofhits.toLocaleString()} results ({responseTiming / 1000} in Sec)
        </div>
      </div>
    </div>
  );
}
