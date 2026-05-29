"use client";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
    </div>
  );
}
