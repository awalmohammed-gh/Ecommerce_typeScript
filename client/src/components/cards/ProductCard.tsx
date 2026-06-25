import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../../Types/type";
import { PlusIcon } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: Props) => {
  const isOutOfStock = product.stock === 0;
  const hasSize = product.sizes && product.sizes.length > 0;
  const navigate = useNavigate();

  const discountPercentage = product.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  const handleAction = () => {
    if (isOutOfStock) return;

    if (hasSize) {
      navigate(`/product-details/${product._id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (onAddToCart) {
        onAddToCart(product);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <Link
        to={`/product-details/${product._id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-square overflow-hidden bg-app-cream"
        >
          <motion.img
            src={product.images[0]}
            alt={product.name}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />

          {product.isNew && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="absolute top-2 left-2 px-2 py-1 bg-app-orange text-white text-xs font-medium rounded-full"
            >
              New
            </motion.div>
          )}

          {product.offerPrice && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full"
            >
              -{discountPercentage}%
            </motion.div>
          )}

          {isOutOfStock && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm px-4 py-2 bg-red-500/80 rounded-full">
                Out of Stock
              </span>
            </motion.div>
          )}
        </motion.div>
      </Link>

      {/* Content */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="p-3 md:p-4"
      >
        <motion.h3
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
          className="font-medium text-app-text text-sm md:text-base line-clamp-1 group-hover:text-app-orange transition-colors"
        >
          {product.name}
        </motion.h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          {product.offerPrice ? (
            <>
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="font-bold text-app-orange text-sm md:text-base"
              >
                {product.offerPrice.toLocaleString("en-GH", {
                  style: "currency",
                  currency: "GHS",
                })}
              </motion.span>

              <span className="text-xs text-app-text-light line-through">
                {product.price.toLocaleString("en-GH", {
                  style: "currency",
                  currency: "GHS",
                })}
              </span>
            </>
          ) : (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="font-bold text-app-green text-sm md:text-base"
            >
              {product.price.toLocaleString("en-GH", {
                style: "currency",
                currency: "GHS",
              })}
            </motion.span>
          )}
        </div>

        {/* Category and Add to Cart in same row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-app-border">
          <p className="text-xs text-app-text-light capitalize">
            <span className="font-medium text-app-text">
              {product.category}
            </span>
          </p>

          <motion.button
            whileHover={!isOutOfStock ? { scale: 1.05 } : {}}
            whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
            onClick={handleAction}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isOutOfStock
                ? "bg-gray-200 cursor-not-allowed text-gray-500"
                : hasSize
                  ? "bg-app-green text-white hover:bg-app-green-light active:scale-95"
                  : "bg-app-orange text-white hover:bg-app-orange-dark active:scale-95"
            }`}
          >
            <motion.span
              animate={!isOutOfStock ? { rotate: [0, 90, 0] } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <PlusIcon className="w-3.5 h-3.5" />
            </motion.span>
            {isOutOfStock
              ? "Out of Stock"
              : hasSize
                ? "View Details"
                : "Add to Cart"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
