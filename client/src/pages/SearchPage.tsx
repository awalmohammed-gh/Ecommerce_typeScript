import { useEffect, useState } from "react";
import type { Product } from "../Types/type";
import { useSearchParams } from "react-router-dom";
import { products } from "../assets/data";
import Loading from "../components/cards/Loading";
import ProductCard from "../components/cards/ProductCard";
import { motion } from "framer-motion";
import {
  SearchIcon,
  HomeIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { icons } from "../assets/icons/icon";
import Advert from "../components/landing/Advert";

const SearchPage = () => {
  const [searchProduct, setSearchProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!query) {
      setLoading(false);
      setSearchProduct([]);
      return;
    }

    const fetchSearchProduct = () => {
      setLoading(true);
      const filteredSearch = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.subCategory?.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase()),
      );

      setSearchProduct(filteredSearch);
    };

    const timer = setTimeout(() => {
      fetchSearchProduct();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-app-cream"
    >
      {/* Header Banner */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full h-48 md:h-56 lg:h-64 bg-gradient-to-r from-app-green to-app-green-light"
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
            className="flex items-center gap-3 mb-3"
          >
            <SearchIcon className="w-8 h-8 text-app-orange" />
            <span className="text-app-orange font-medium text-sm uppercase tracking-wider">
              Search Results
            </span>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl font-serif text-white font-bold"
          >
            {query ? `Results for (${query})` : "Search Products"}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-white/80 text-sm md:text-base max-w-2xl mt-2"
          >
            {query
              ? `Found ${searchProduct.length} product${searchProduct.length !== 1 ? "s" : ""} matching your search`
              : "Enter a search term to find products"}
          </motion.p>
        </div>
      </motion.div>

      {/* Breadcrumbs */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white border-b border-app-border/50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-app-text-light hover:text-app-orange transition-colors flex items-center gap-1"
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
            <ChevronRightIcon className="w-4 h-4 text-app-text-light" />
            <span className="text-app-orange font-medium">Search</span>
            {query && (
              <>
                <ChevronRightIcon className="w-4 h-4 text-app-text-light" />
                <span className="text-app-text font-medium truncate max-w-xs">
                  "{query}"
                </span>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Results Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-app-text">
              {searchProduct.length}{" "}
              {searchProduct.length === 1 ? "Product" : "Products"} Found
            </h2>
            <p className="text-sm text-app-text-light">
              {query
                ? `Showing results for "${query}"`
                : "Enter a search term to find products"}
            </p>
          </div>
          {searchProduct.length > 0 && (
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm text-app-orange hover:text-app-orange-dark transition-colors"
            >
              <ShoppingBagIcon className="w-4 h-4" />
              Browse All Products
            </Link>
          )}
        </motion.div>

        {/* Products Grid */}
        {searchProduct.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 gap-y-8"
          >
            {searchProduct.map((product, index) => (
              <motion.div
                key={product._id || index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3 },
                  },
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm"
          >
            {query ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
                  className="flex items-center justify-center mb-4"
                >
                  <img className="size-14" src={icons.search} alt="Search" />
                </motion.div>
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="text-xl font-semibold text-app-text mb-2"
                >
                  No Products Found
                </motion.h3>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="text-app-text-light text-sm max-w-md mx-auto"
                >
                  We couldn't find any products matching{" "}
                  <span className="font-medium text-app-text">"{query}"</span>.
                  Try adjusting your search terms.
                </motion.p>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/products"
                    className="inline-block mt-4 px-6 py-2 bg-app-orange text-white rounded-full text-sm font-medium hover:bg-app-orange-dark transition-colors"
                  >
                    Browse All Products
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
                  className="flex items-center justify-center mb-4"
                >
                  <SearchIcon className="w-16 h-16 text-app-text-light/30" />
                </motion.div>
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="text-xl font-semibold text-app-text mb-2"
                >
                  Search for Products
                </motion.h3>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="text-app-text-light text-sm max-w-md mx-auto"
                >
                  Enter a search term above to find products you're looking for.
                </motion.p>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default SearchPage;
