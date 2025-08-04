import { Search, X } from "lucide-react";

const SearchBar = () => {
  return (
    <form className="flex bg-white border border-gray-800 text-black rounded-md shadow text-sm w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <div
        aria-disabled="true"
        className="w-8 sm:w-10 grid place-content-center flex-shrink-0"
      >
        <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
      </div>
      <input
        type="text"
        spellCheck="false"
        name="text"
        className="bg-transparent py-1.5 outline-none placeholder:text-gray-500 w-16 sm:w-20 focus:w-32 sm:focus:w-48 md:focus:w-56 lg:focus:w-64 transition-all text-black min-w-0 flex-grow"
        placeholder="Search..."
      />
      <button
        className="w-8 sm:w-10 grid place-content-center hover:bg-gray-100 rounded-r-md transition-colors flex-shrink-0"
        aria-label="Clear input button"
        type="reset"
      >
        <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
      </button>
    </form>
  );
};

export default SearchBar;
