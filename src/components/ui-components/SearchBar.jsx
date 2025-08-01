import { Search, X } from "lucide-react";

const SearchBar = () => {
  return (
    <form className="flex bg-white border border-gray-800 text-black rounded-md shadow text-sm">
      <div aria-disabled="true" className="w-10 grid place-content-center">
        <Search className="h-4 w-4 text-gray-600" />
      </div>
      <input
        type="text"
        spellCheck="false"
        name="text"
        className="bg-transparent py-1.5 outline-none placeholder:text-gray-500 w-20 focus:w-48 transition-all text-black"
        placeholder="Search..."
      />
      <button
        className="w-10 grid place-content-center hover:bg-gray-100 rounded-r-md transition-colors"
        aria-label="Clear input button"
        type="reset"
      >
        <X className="h-4 w-4 text-gray-600" />
      </button>
    </form>
  );
};

export default SearchBar;
