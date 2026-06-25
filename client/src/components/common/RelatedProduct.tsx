import { useEffect, useState } from "react";
import type { Product } from "../../Types/type";
import { products } from "../../assets/data";
import Loading from "../cards/Loading";
import ProductCard from "../cards/ProductCard";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

const RelatedProduct = ({ category, currentProductId }) => {
  const [relatedProduct, setRelatedProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchRelatedProduct = () => {
      // Filter products by same category, exclude current product, and limit to 5
      const filteredProduct = products
        .filter(
          (item) => item.category === category && item._id !== currentProductId, // Exclude current product
        )
        .slice(0, 5);
      setRelatedProduct(filteredProduct);
    };

    const timer = setTimeout(() => {
      fetchRelatedProduct();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [category, currentProductId]);

  if (loading) {
    return <Loading />;
  }

  if (relatedProduct.length === 0) {
    return null; // Don't show section if no related products
  }

  return (
    <section className="mt-12 md:mt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-app-text">
            You Might Also <span className="text-app-orange">Like</span>
          </h2>
          <p className="text-sm text-app-text-light mt-1">
            Discover more from the {category} collection
          </p>
        </div>
        <Link
          to={`/products?category=${category}`}
          className="flex items-center gap-2 text-sm text-app-green hover:text-app-orange transition-colors group"
        >
          <span>View All</span>
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 gap-y-8">
        {relatedProduct.map((product) => (
          <ProductCard
            product={product}
            key={product._id}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProduct;
