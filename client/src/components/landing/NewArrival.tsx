import { useEffect, useState } from "react";
import type { Product } from "../../Types/type";
import { products } from "../../assets/data";
import Loading from "../cards/Loading";
import ProductCard from "../cards/ProductCard";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NewArrival = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filteredProduct = products.filter(
      (product) => product.isNew === true,
    );
    setNewProducts(filteredProduct);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      className="py-12 md:py-16 bg-app-cream"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 md:mb-12"
        >
          <div>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-2"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <SparklesIcon className="w-5 h-5 text-app-orange" />
              </motion.span>
              <span className="text-app-orange font-medium text-sm uppercase tracking-wider">
                New Arrivals
              </span>
            </motion.div>
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-serif text-app-text"
            >
              Fresh <span className="text-app-orange">Collections</span>
            </motion.h2>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-app-text-light text-sm mt-1"
            >
              Discover our latest styles added just for you
            </motion.p>
          </div>

          <motion.div
            initial={{ x: 10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ x: 4 }}
          >
            <Link
              to="/new"
              className="flex items-center gap-2 text-app-green hover:text-app-orange font-medium transition-colors mt-4 sm:mt-0 group"
            >
              <span>View All</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <ArrowRightIcon className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        {newProducts.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 gap-y-12"
          >
            {newProducts.map((product, index) => (
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
                <ProductCard product={product} key={product._id || index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-app-text-light">
              No new products available at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default NewArrival;
