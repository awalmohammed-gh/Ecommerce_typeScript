import { communityLikes } from "../../assets/data";
import { HeartIcon} from "lucide-react";

const CommunityLikes = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <HeartIcon className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="text-app-orange font-medium text-sm uppercase tracking-wider">
              Community Likes
            </span>
            <HeartIcon className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-app-text mb-4">
            Loved by Our <span className="text-app-orange">Community</span>
          </h2>
          <p className="text-app-text-light max-w-2xl mx-auto text-base md:text-lg">
            See what our customers are wearing and loving right now
          </p>
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {communityLikes.map((likes, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-app-cream shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={likes}
                  alt={`Community style ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityLikes;
