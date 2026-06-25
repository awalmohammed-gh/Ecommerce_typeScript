import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../Types/type";
import { products } from "../assets/data";
import Loading from "../components/cards/Loading";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  StarIcon,
  HeartIcon,
  Share2Icon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "lucide-react";
import { useShop } from "../context/ShopContextProvider";
import toast from "react-hot-toast";
import RelatedProduct from "../components/common/RelatedProduct";
import { motion } from "motion/react";

const ProductsPage = () => {
  const {
    addToCart,
    updateQuantity,
    cartItems,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    wishlist,
  } = useShop();
  const { id } = useParams();
  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState("");
  const [size, setSize] = useState("");
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    const fetchDataDetails = () => {
      setLoading(true);
      const findProduct = products.find((product) => product._id === id);
      if (findProduct) {
        setProductData(findProduct);
        setThumbnail(findProduct.images[0]);
        if (findProduct.sizes && findProduct.sizes.length > 0) {
          setSize(findProduct.sizes[0]);
        }
      }
    };
    const timer = setTimeout(() => {
      fetchDataDetails();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleWishlist = () => {
    if (!productData) return;

    if (wishlist.includes(productData._id)) {
      removeFromWishlist(productData._id);
      toast.success("Product removed from wishlist");
    } else {
      addToWishlist(productData._id);
      toast.success("Product added to wishlist");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!productData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[60vh] flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-semibold text-app-text">
          Product Not Found
        </h2>
        <p className="text-app-text-light mt-2">
          The product you're looking for doesn't exist.
        </p>
        <Link
          to="/products"
          className="mt-4 px-6 py-2 bg-app-orange text-white rounded-full"
        >
          Back to Products
        </Link>
      </motion.div>
    );
  }

  const isWishlisted = wishlist.includes(productData._id);

  const getCartItem = (productId: string, selectedSize: string) => {
    return cartItems.find(
      (item) =>
        item.product?._id === productId && item.selectedSize === selectedSize,
    );
  };

  const cartItem = size ? getCartItem(productData._id, size) : undefined;
  const inCart = !!cartItem;
  const displayQuantity = cartItem?.quantity ?? localQuantity;

  const handleDecrement = () => {
    if (inCart) {
      if (cartItem.quantity > 1) {
        updateQuantity(productData._id, cartItem.quantity - 1, size);
      } else {
        removeFromCart(productData._id, size);
      }
    } else {
      setLocalQuantity(Math.max(1, localQuantity - 1));
    }
  };

  const handleIncrement = () => {
    if (!size && productData.sizes && productData.sizes.length > 0) {
      return toast.error("Please select product size");
    }
    if (inCart) {
      updateQuantity(productData._id, cartItem.quantity + 1, size);
    } else {
      setLocalQuantity(localQuantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (productData.stock === 0) {
      return toast.error("Product is out of stock");
    }

    if (productData.sizes && productData.sizes.length > 0 && !size) {
      return toast.error("Please select a size");
    }

    addToCart(productData, localQuantity, size);
    toast.success("Product added to cart");
  };

  const discountPercentage = productData.offerPrice
    ? Math.round(
        ((productData.price - productData.offerPrice) / productData.price) *
          100,
      )
    : 0;

  const isOutOfStock = productData.stock === 0;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-app-cream min-h-screen py-8 md:py-12"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center gap-2 text-sm mb-6 bg-white p-3 rounded-lg shadow-sm"
        >
          <Link
            to="/"
            className="text-app-text-light hover:text-app-orange transition-colors"
          >
            Home
          </Link>
          <span className="text-app-text-light">/</span>
          <Link
            to="/products"
            className="text-app-text-light hover:text-app-orange transition-colors"
          >
            Products
          </Link>
          <span className="text-app-text-light">/</span>
          <Link
            to={`/products?category=${productData.category}`}
            className="text-app-text-light hover:text-app-orange transition-colors capitalize"
          >
            {productData.category}
          </Link>
          <span className="text-app-text-light">/</span>
          <span className="text-app-orange font-medium truncate">
            {productData.name}
          </span>
        </motion.nav>

        {/* Main Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8 lg:p-12">
            {/* Left - Images */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:w-1/2"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1">
                  {productData.images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setThumbnail(image)}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        thumbnail === image
                          ? "border-app-orange shadow-md"
                          : "border-app-border hover:border-app-orange/50"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Main Image */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex-1 order-1 md:order-2 relative"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-app-cream border border-app-border">
                    <img
                      src={thumbnail}
                      alt={productData.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Discount Badge */}
                    {productData.offerPrice && (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full"
                      >
                        -{discountPercentage}%
                      </motion.div>
                    )}

                    {/* New Badge */}
                    {productData.isNew && (
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="absolute top-4 right-4 px-3 py-1.5 bg-app-orange text-white text-sm font-bold rounded-full"
                      >
                        New
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Product Info */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:w-1/2 space-y-6"
            >
              {/* Back Button */}
              <motion.button
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 text-sm text-app-text-light hover:text-app-orange transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back
              </motion.button>

              {/* Product Name */}
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-2xl md:text-3xl lg:text-4xl font-serif text-app-text"
              >
                {productData.name}
              </motion.h1>

              {/* Rating */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      key={index}
                      className={`w-4 h-4 ${
                        index < (productData.rating || 4)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-app-text-light">
                  ({productData.reviews || 0} reviews)
                </span>
                {productData.stock > 0 && (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircleIcon className="w-3 h-3" />
                    In Stock
                  </span>
                )}
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                {productData.offerPrice ? (
                  <div className="flex items-center gap-3">
                    <p className="text-3xl font-bold text-app-orange">
                      {productData.offerPrice.toLocaleString("en-GH", {
                        style: "currency",
                        currency: "GHS",
                      })}
                    </p>
                    <p className="text-lg text-app-text-light line-through">
                      {productData.price.toLocaleString("en-GH", {
                        style: "currency",
                        currency: "GHS",
                      })}
                    </p>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                      Save {discountPercentage}%
                    </span>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-app-green">
                    {productData.price.toLocaleString("en-GH", {
                      style: "currency",
                      currency: "GHS",
                    })}
                  </p>
                )}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <h3 className="text-sm font-semibold text-app-text mb-2">
                  Description
                </h3>
                <p className="text-app-text-light text-sm leading-relaxed">
                  {productData.description || "No description available."}
                </p>
              </motion.div>

              {/* Size Selection */}
              {productData.sizes && productData.sizes.length > 0 && (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-app-text">
                      Select Size
                    </h3>
                    <span className="text-xs text-app-text-light">
                      Size Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productData.sizes.map((s, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSize(s)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                          size === s
                            ? "border-app-orange bg-app-orange/10 text-app-orange"
                            : "border-app-border hover:border-app-orange/50 text-app-text"
                        }`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quantity & Add to Cart */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-app-border rounded-lg overflow-hidden">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDecrement}
                      className="p-2 hover:bg-app-cream transition-colors disabled:opacity-50"
                      disabled={displayQuantity <= 1}
                    >
                      <MinusIcon className="w-4 h-4" />
                    </motion.button>
                    <span className="w-12 text-center font-medium text-sm">
                      {displayQuantity}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleIncrement}
                      className="p-2 hover:bg-app-cream transition-colors disabled:opacity-50"
                      disabled={isOutOfStock}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                      isOutOfStock
                        ? "bg-gray-300 cursor-not-allowed text-gray-500"
                        : "bg-app-green text-white hover:bg-app-green-light active:scale-95"
                    }`}
                  >
                    <ShoppingBagIcon className="w-4 h-4" />
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </motion.button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWishlist}
                    className="flex items-center gap-2 px-4 py-2 border border-app-border rounded-lg hover:bg-app-cream transition-colors text-sm"
                  >
                    <HeartIcon
                      className={`w-4 h-4 ${
                        isWishlisted ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                    {isWishlisted ? "Remove from" : "Add to"} Wishlist
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 border border-app-border rounded-lg hover:bg-app-cream transition-colors text-sm"
                  >
                    <Share2Icon className="w-4 h-4" />
                    Share
                  </motion.button>
                </div>
              </motion.div>

              {/* Delivery Info */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="pt-4 border-t border-app-border space-y-2"
              >
                <div className="flex items-center gap-3 text-sm text-app-text-light">
                  <TruckIcon className="w-4 h-4 text-app-green" />
                  <span>Free delivery on orders over ₵200</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-app-text-light">
                  <ShieldCheckIcon className="w-4 h-4 text-app-green" />
                  <span>30-day return policy</span>
                </div>
                <p className="text-xs text-app-text-light">
                  {productData.stock} units available
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <RelatedProduct
            category={productData.category}
            currentProductId={productData._id}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductsPage;
