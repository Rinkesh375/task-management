"use client";
import { useState, useMemo } from "react";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Header({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 400),
    [onSearch]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }

  return (
    <header className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">To-Do Weekly</h1>
        <p className="text-sm text-slate-500">Organize tasks by wee</p>
      </div>

      <div className="relative w-full">
        <Input
          value={query}
          onChange={handleChange}
          placeholder="Search for a task"
          className="
            h-12 w-full rounded-xl pr-12
            border border-gray-200 shadow-sm
            text-sm placeholder:text-gray-400
          "
        />

        <Search
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-gray-600 w-5 h-5
          "
        />
      </div>
    </header>
  );
}
