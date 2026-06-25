import { Link } from "react-router-dom";
import { shopCategory } from "../../assets/data";
import { ArrowRightIcon, ShoppingBagIcon } from "lucide-react";
import { motion } from "framer-motion";

const ShopCategory = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      className="py-12 md:py-16 lg:py-20 bg-app-cream"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-app-orange font-medium text-sm uppercase tracking-wider mb-2"
          >
            Shop by Category
          </motion.p>
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-app-text mb-4"
          >
            Find Your <span className="text-app-orange">Style</span>
          </motion.h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-app-text-light max-w-2xl mx-auto"
          >
            Explore our curated collections crafted for every occasion and
            personality
          </motion.p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8"
        >
          {shopCategory.map((shop, index) => (
            <motion.div
              key={shop.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Link
                to={`/categories?category=${shop.path}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 block"
              >
                {/* Image Container */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-4/3 overflow-hidden bg-app-cream"
                >
                  <motion.img
                    src={shop.image}
                    alt={shop.name}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Gradient */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  />

                  {/* Quick Shop Button - Appears on Hover */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-app-text rounded-full text-sm font-medium shadow-lg hover:bg-app-orange hover:text-white transition-colors duration-300"
                    >
                      <ShoppingBagIcon className="w-4 h-4" />
                      Shop Now
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.08 + 0.2 }}
                  viewport={{ once: true }}
                  className="p-4 md:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <motion.h3
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm md:text-lg font-semibold text-app-text group-hover:text-app-orange transition-colors duration-300"
                      >
                        {shop.name}
                      </motion.h3>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-app-cream flex items-center justify-center group-hover:bg-app-orange group-hover:text-white transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRightIcon className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Decorative Line */}
                  <motion.div
                    initial={{ width: 48 }}
                    whileHover={{ width: 64 }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-app-orange mt-3"
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ShopCategory;
