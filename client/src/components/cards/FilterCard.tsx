import { CheckIcon, XIcon, FilterIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";

type FilterItem = {
  name: string;
  path: string;
  type: "category" | "subcategory";
};

const FilterCard = ({
  updateFilter,
  category,
  hasFilter,
  clearFilter,
  categories,
  minPrice,
  maxPrice,
}: {
  updateFilter: (key: string, value: string | number) => void;
  category: string;
  hasFilter: any;
  clearFilter: () => void;
  categories: [];
  minPrice: number;
  maxPrice: number;
}) => {
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  // Filter only main categories (exclude subcategories)
//   const mainCategories = categories.filter((cat) => cat.type === "category");

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-app-border">
        <div className="flex items-center gap-2">
          <FilterIcon className="w-4 h-4 text-app-orange" />
          <h2 className="text-base font-semibold text-app-text">Filters</h2>
        </div>

        {hasFilter && (
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 text-xs text-app-orange hover:text-app-orange-dark transition-colors"
          >
            <XIcon className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-4">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="text-xs font-semibold text-app-text uppercase tracking-wider">
            Categories
          </h3>

          <ChevronDownIcon
            className={`w-3 h-3 text-app-text-light transition-transform duration-300 ${
              isCategoryOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isCategoryOpen && (
          <div className="grid grid-cols-2 gap-1">
            {categories.map((cat: FilterItem) => {
              const isActive = category === cat.path;
              return (
                <button
                  key={cat.name}
                  onClick={() => updateFilter("category", cat.path)}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isActive
                      ? "bg-app-orange/10 text-app-orange font-medium"
                      : "text-app-text-light hover:bg-app-cream hover:text-app-text"
                  }`}
                >
                  <span>{cat.name}</span>

                  {isActive && (
                    <CheckIcon className="w-3 h-3 text-app-orange" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="text-xs font-semibold text-app-text uppercase tracking-wider">
            Price Range
          </h3>

          <ChevronDownIcon
            className={`w-3 h-3 text-app-text-light transition-transform duration-300 ${
              isPriceOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isPriceOpen && (
          <div className="space-y-3">
            <div className="flex gap-2">
              {/* Min Price */}
              <div className="flex-1">
                <label className="block text-xs text-app-text-light mb-0.5">
                  Min
                </label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-app-text-light text-xs">
                    ₵
                  </span>

                  <input
                    value={minPrice || ""}
                    onChange={(e) =>
                      updateFilter("minPrice", Number(e.target.value))
                    }
                    type="number"
                    placeholder="0"
                    min="0"
                    className="w-full pl-5 pr-2 py-1.5 border border-app-border rounded-lg text-xs focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Max Price */}
              <div className="flex-1">
                <label className="block text-xs text-app-text-light mb-0.5">
                  Max
                </label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-app-text-light text-xs">
                    ₵
                  </span>

                  <input
                    value={maxPrice || ""}
                    onChange={(e) =>
                      updateFilter("maxPrice", Number(e.target.value))
                    }
                    type="number"
                    placeholder="50000"
                    min="0"
                    className="w-full pl-5 pr-2 py-1.5 border border-app-border rounded-lg text-xs focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Apply Price Button */}
            <button
              onClick={() => {
                updateFilter("minPrice", minPrice || 0);
                updateFilter("maxPrice", maxPrice || 50000);
              }}
              className="w-full py-1.5 bg-app-green text-white text-xs font-medium rounded-lg hover:bg-app-green-light transition-colors"
            >
              Apply Price Range
            </button>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {hasFilter && (
        <div className="mt-4 pt-3 border-t border-app-border">
          <p className="text-xs text-app-text-light mb-1.5">Active Filters:</p>
          <div className="flex flex-wrap gap-1.5">
            {category && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-app-orange/10 text-app-orange text-xs rounded-full capitalize">
                {category.replace(/-/g, " ")}
                <button
                  onClick={() => updateFilter("category", "")}
                  className="hover:text-app-orange-dark"
                >
                  <XIcon className="w-2.5 h-2.5" />
                </button>
              </span>
            )}
            {(minPrice > 0 || (maxPrice && maxPrice < 50000)) && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-app-orange/10 text-app-orange text-xs rounded-full">
                ₵{minPrice || 0} - ₵{maxPrice || 50000}
                <button
                  onClick={() => {
                    updateFilter("minPrice", 0);
                    updateFilter("maxPrice", 50000);
                  }}
                  className="hover:text-app-orange-dark"
                >
                  <XIcon className="w-2.5 h-2.5" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterCard;
