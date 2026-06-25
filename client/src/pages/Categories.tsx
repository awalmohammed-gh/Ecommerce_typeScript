import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Product } from "../Types/type";
import { products } from "../assets/data";
import Loading from "../components/cards/Loading";
import ProductCard from "../components/cards/ProductCard";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { icons } from "../assets/icons/icon";
import { motion } from "motion/react";

const categoryContent = {
  men: {
    title: "Men's Fragrance Collection",
    description:
      "Discover bold, sophisticated, and timeless fragrances crafted for the modern gentleman.",
  },
  women: {
    title: "Women's Fragrance Collection",
    description:
      "Explore elegant and captivating fragrances designed to celebrate confidence and beauty.",
  },
  kids: {
    title: "Kids' Collection",
    description:
      "Delight the little ones with gentle, playful, and age-appropriate fragrances and products designed to bring joy and comfort every day.",
  },
  accessories: {
    title: "Fragrance Accessories Collection",
    description:
      "Complete your fragrance experience with premium accessories, including travel atomizers, gift sets, storage solutions, and other essentials for every fragrance enthusiast.",
  },
};

const Categories = () => {
  const [categoryData, setCategoryData] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = () => {
      setLoading(true);
      const filteredProduct = products.filter(
        (item) =>
          item.targetAudience?.toLowerCase() === category?.toLowerCase(),
      );
      setCategoryData(filteredProduct);
    };

    const timer = setTimeout(() => {
      fetchCategoryData();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [category]);

  if (loading) {
    return <Loading />;
  }

  const content = categoryContent[category as keyof typeof categoryContent];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-app-cream"
    >
      {/* Banner */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full h-48 md:h-56 lg:h-64 bg-[url('/categoryBg.jpg')] bg-no-repeat bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl font-serif text-white font-bold"
          >
            {content?.title || category?.toUpperCase() || "Category"}
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white/80 text-sm md:text-base max-w-2xl mt-2"
          >
            {content?.description || `Explore our ${category} collection`}
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
            <Link
              to="/products"
              className="text-app-text-light hover:text-app-orange transition-colors"
            >
              Products
            </Link>
            <ChevronRightIcon className="w-4 h-4 text-app-text-light" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-app-orange font-medium capitalize"
            >
              {category || "Category"}
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
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
              {categoryData.length}{" "}
              {categoryData.length === 1 ? "Product" : "Products"} Found
            </h2>
            <p className="text-sm text-app-text-light">
              Showing results for{" "}
              <span className="font-medium text-app-text capitalize">
                {category}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Products Grid */}
        {categoryData.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 gap-y-8"
          >
            {categoryData.map((product, index) => (
              <motion.div
                key={product._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <ProductCard product={product} key={product._id || index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16 bg-white rounded-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
              className="flex items-center justify-center mb-4"
            >
              <img className="size-14" src={icons.search} alt={"Search"} />
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
              We couldn't find any products in the{" "}
              <span className="font-medium capitalize">{category}</span>{" "}
              category.
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
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Categories;
