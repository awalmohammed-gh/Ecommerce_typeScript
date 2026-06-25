import { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductCard";
import { useShop } from "../context/ShopContextProvider";
import type { Product } from "../Types/type";
import { products } from "../assets/data";
import Loading from "../components/cards/Loading";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  HomeIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
} from "lucide-react";

const Wishlist = () => {
  const { wishlist } = useShop();
  const [wishData, setWishData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishData = () => {
      setLoading(true);
      const filteredWishlist = products.filter((product) =>
        wishlist.includes(product._id),
      );
      setWishData(filteredWishlist);
    };

    const timer = setTimeout(() => {
      fetchWishData();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [wishlist]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="min-h-screen bg-app-cream">
      {/* Header Banner */}
      <div className="relative w-full h-48 md:h-56 lg:h-64 bg-gradient-to-r from-app-green to-app-green-light">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 mb-3">
            <HeartIcon className="w-8 h-8 text-app-orange fill-app-orange" />
            <span className="text-app-orange font-medium text-sm uppercase tracking-wider">
              My Wishlist
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white font-bold">
            Your Saved <span className="text-app-orange">Items</span>
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-2">
            Keep track of your favorite products and never miss out on what you
            love
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-app-border/50">
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
            <span className="text-app-orange font-medium">Wishlist</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-app-text">
              {wishData.length} {wishData.length === 1 ? "Item" : "Items"} in
              Wishlist
            </h2>
            <p className="text-sm text-app-text-light">
              {wishData.length > 0
                ? "Products you've saved for later"
                : "Start adding items you love"}
            </p>
          </div>
          {wishData.length > 0 && (
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm text-app-orange hover:text-app-orange-dark transition-colors"
            >
              <ShoppingBagIcon className="w-4 h-4" />
              Continue Shopping
            </Link>
          )}
        </div>

        {/* Products Grid */}
        {wishData.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 gap-y-12">
            {wishData.map((product, index) => (
              <ProductCard
                product={product}
                key={product._id || index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="w-24 h-24 rounded-full bg-app-cream flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="w-12 h-12 text-app-text-light/40" />
            </div>
            <h3 className="text-xl font-semibold text-app-text mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-app-text-light text-sm max-w-md mx-auto">
              Start adding items you love to your wishlist by clicking the heart
              icon on any product.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ShoppingBagIcon className="w-4 h-4" />
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
