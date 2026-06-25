import { useEffect, useState } from "react";
import type { Product } from "../Types/type";
import { useSearchParams } from "react-router-dom";
import FilterCard from "../components/cards/FilterCard";
import Loading from "../components/cards/Loading";
import ProductCard from "../components/cards/ProductCard";
import { products } from "../assets/data";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Grid3x3Icon,
  ListIcon,
  ChevronDownIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Products = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [...new Set(products.map((p) => p.category))].map(
    (item) => ({
      name: item,
      path: item.toLowerCase(),
      type: "category",
    }),
  );

  const allFilters = [
    { name: "All Products", path: "", type: "category" },
    ...categories,
  ];

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page") || 1);
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 50000);
  const ITEMS_PER_PAGE = 12;

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price_low_to_high", label: "Price: Low to High" },
    { value: "price_high_to_low", label: "Price: High to Low" },
    { value: "name_a_z", label: "Name: A-Z" },
    { value: "name_z_a", label: "Name: Z-A" },
    { value: "rating", label: "Highest Rated" },
  ];

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const fetchProduct = () => {
    setLoading(true);

    let filteredProduct = [...products];

    // Filter by category
    if (category) {
      filteredProduct = filteredProduct.filter(
        (product) =>
          product.category.toLowerCase().replace(/\s+/g, "-") === category,
      );
    }

    // Filter by min price
    if (minPrice > 0) {
      filteredProduct = filteredProduct.filter(
        (product) => product.price >= minPrice,
      );
    }

    // Filter by max price
    if (maxPrice > 0 && maxPrice < 50000) {
      filteredProduct = filteredProduct.filter(
        (product) => product.price <= maxPrice,
      );
    }

    // Sorting
    if (sort === "price_low_to_high") {
      filteredProduct.sort((a, b) => a.price - b.price);
    } else if (sort === "price_high_to_low") {
      filteredProduct.sort((a, b) => b.price - a.price);
    } else if (sort === "name_a_z") {
      filteredProduct.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name_z_a") {
      filteredProduct.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "rating") {
      filteredProduct.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    // Pagination
    const productPagination = filteredProduct.slice(startIndex, endIndex);
    setProductData(productPagination);
    setLoading(false);
  };

  const updateFilter = (key: string, value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, String(value));
    } else {
      newSearchParams.delete(key);
    }

    if (key !== "page") {
      newSearchParams.delete("page");
    }

    setSearchParams(newSearchParams);
  };

  const clearFilter = () => {
    setSearchParams({});
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter("sort", e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    updateFilter("page", String(newPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasFilter = category || minPrice > 0 || maxPrice < 50000;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchProduct();
      setLoading(false)
    }, 100);
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, category, sort, page]);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-app-cream min-h-screen"
    >
      {/* Header Banner */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-[url('/product_banner.jpg')] w-full h-30 md:h-72 lg:h-50 bg-no-repeat bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-bold"
          >
            All Products
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white/80 text-sm sm:text-base max-w-2xl mt-2"
          >
            Explore our full collection of products and find exactly what you
            need in one place.
          </motion.p>
        </div>
      </motion.div>

      {/* Breadcrumbs */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white border-b border-app-border"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <a
              href="/"
              className="text-app-text-light hover:text-app-orange transition-colors"
            >
              Home
            </a>
            <span className="text-app-text-light">/</span>
            <span className="text-app-text font-medium">Products</span>
            {category && (
              <>
                <span className="text-app-text-light">/</span>
                <span className="text-app-orange capitalize">{category}</span>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          {/* Left Side - Filter */}
          <motion.aside
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:w-72 xl:w-80 shrink-0"
          >
            <div className="sticky top-24">
              <FilterCard
                updateFilter={updateFilter}
                categories={allFilters}
                hasFilter={hasFilter}
                category={category}
                clearFilter={clearFilter}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </div>
          </motion.aside>

          {/* Right Side - Products */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex-1 min-w-0"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <p className="text-sm text-app-text-light">
                Showing{" "}
                <span className="font-semibold text-app-text">
                  {productData.length}
                </span>{" "}
                {productData.length <= 1 ? "product" : "products"} found
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* View Mode Toggle */}
                <div className="hidden sm:flex border border-app-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-app-orange text-white"
                        : "bg-white text-app-text-light hover:bg-app-cream"
                    }`}
                  >
                    <Grid3x3Icon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list"
                        ? "bg-app-orange text-white"
                        : "bg-white text-app-text-light hover:bg-app-cream"
                    }`}
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sort}
                    onChange={handleSortChange}
                    className="w-full sm:w-48 appearance-none px-4 py-2 pr-8 bg-white border border-app-border rounded-lg text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {productData.length > 0 ? (
              <motion.div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 gap-y-8"
                    : "space-y-4"
                }
              >
                <AnimatePresence mode="wait">
                  {productData.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: "easeOut",
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        transition: { duration: 0.2 },
                      }}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <ProductCard key={product._id} product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16 bg-white rounded-xl"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-app-text mb-2">
                  No Products Found
                </h3>
                <p className="text-app-text-light text-sm">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilter}
                  className="mt-4 px-6 py-2 bg-app-orange text-white rounded-full text-sm font-medium hover:bg-app-orange-dark transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex items-center justify-center gap-2 mt-10"
              >
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-app-border hover:bg-app-cream disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                          page === pageNumber
                            ? "bg-app-orange text-white shadow-md scale-105"
                            : "bg-white border border-app-border text-app-text hover:bg-app-cream hover:border-app-orange"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-app-border hover:bg-app-cream disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Products;
