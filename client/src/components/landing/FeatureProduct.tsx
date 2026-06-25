import { useEffect, useState } from "react";
import type { Product } from "../../Types/type";
import { products } from "../../assets/data";
import Loading from "../cards/Loading";
import ProductCard from "../cards/ProductCard";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureProduct = () => {
  const [featureProduct, setFeatureProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     
    const filteredProduct = [...products].sort(() => Math.random() - 0.5).slice(0,8)
     setFeatureProduct(filteredProduct);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-12 md:py-16 bg-app-cream">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SparklesIcon className="w-5 h-5 text-app-orange" />
              <span className="text-app-orange font-medium text-sm uppercase tracking-wider">
                Featured Products
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-app-text">
              Fresh <span className="text-app-orange">Collections</span>
            </h2>
            <p className="text-app-text-light text-sm mt-1">
              Top picks for your everyday style. Quality pieces, chosen just for
              you.
            </p>
          </div>

          <Link
            to="/shop"
            className="flex items-center gap-2 text-app-green hover:text-app-orange font-medium transition-colors mt-4 sm:mt-0 group"
          >
            <span>View All</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Main Content */}
        {featureProduct.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-12 md:gap-8 ">
            {featureProduct.map((product, index) => (
              <ProductCard product={product} key={product._id || index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-app-text-light">
              No feature products available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureProduct;
