import { Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Header({ query, handleSearch }) {
  return (
    <header className="bg-[#ff6600] p-2">
      <div className="container mx-auto flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Link
            to="dashboard"
            className="flex h-8 w-8 items-center justify-center rounded bg-white text-[#ff6600] font-bold"
          >
            H
          </Link>
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
              className="pl-8 bg-white"
            />
          </div>
          <div className="flex items-center gap-2 text-black text-sm">
            Search by
            <img src="./home.svg" alt="Algolia" className="h-4" />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#ff7700]"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
