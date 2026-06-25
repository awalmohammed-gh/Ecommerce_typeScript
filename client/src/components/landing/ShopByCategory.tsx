import { Link } from "react-router-dom";
import { subCategory } from "../../assets/data";
import { ArrowRightIcon } from "lucide-react";

const ShopByCategory = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-app-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-app-orange font-medium text-sm uppercase tracking-wider mb-2">
            Shop by Category
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-app-text">
            Browse by <span className="text-app-orange">Collection</span>
          </h2>
          <p className="text-app-text-light mt-2">
            Explore our curated categories
          </p>
        </div>

        {/* Category Grid - Circular */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {subCategory.map((shop: any) => (
            <Link
              to={`products?category=${shop.path}`}
              onClick={() => window.scrollTo({top:0, behavior:"smooth"})}
              key={shop.id}
              className="group flex flex-col items-center gap-3 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Circular Image Icon */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-app-orange">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Name */}
              <span className="text-sm font-medium text-app-text group-hover:text-app-orange transition-colors duration-300 text-center">
                {shop.name}
              </span>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-app-green text-white hover:bg-app-green-light font-semibold rounded-full transition-all duration-300"
          >
            Browse All Categories
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
