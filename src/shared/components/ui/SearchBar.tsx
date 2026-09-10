import { useState, useRef, useEffect } from "react";
import { Search, MapPin, ChevronDown, Globe } from "lucide-react";

const CITIES = [
  "Qualquer lugar",
  "Salvador",
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Online",
];

type SearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
};

export default function SearchBar({
  query,
  onQueryChange,
  selectedCity,
  onCityChange,
}: SearchBarProps) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); 

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2" ref={wrapperRef}>

      
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 w-full max-w-md shadow-sm">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar eventos, artistas, locais..."
          className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full min-w-0"
        />
      </div>

      
      <div className="relative w-full sm:w-auto">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center sm:justify-start gap-2 bg-blue-50 text-orange-600 font-medium text-sm px-4 py-2.5 rounded-full hover:bg-blue-100 transition-colors w-full sm:w-auto whitespace-nowrap"
        >
          <MapPin size={15} />
          <span>{selectedCity}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

       
        {open && (
          <div className="absolute top-[calc(100%+8px)] left-0 sm:left-auto sm:right-0 bg-white border border-gray-100 rounded-2xl shadow-lg py-1.5 sm:min-w-48 z-50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
              Cidades
            </p>
            {CITIES.map((city) => (
              <button
                key={city}
                onClick={() => {
                  onCityChange(city);
                  setOpen(false);
                }}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm transition-colors hover:bg-gray-50 ${
                  selectedCity === city
                    ? "text-blue-600 font-medium bg-blue-50"
                    : "text-gray-700"
                }`}
              >
                {city === "Qualquer lugar" ? (
                  <Globe size={13} className="shrink-0" />
                ) : (
                  <MapPin size={13} className="shrink-0" />
                )}
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
