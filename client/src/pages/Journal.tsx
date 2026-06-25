import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ArrowRightIcon,
  SearchIcon,
  ChevronRightIcon,
  HomeIcon,
  BookOpenIcon,
} from "lucide-react";

// Sample journal data with picsum images
const journalPosts = [
  {
    id: 1,
    title: "The Art of Layering: A Guide to Year-Round Style",
    excerpt:
      "Discover the secrets to mastering the art of layering. From lightweight fabrics to statement pieces, learn how to create versatile looks for every season.",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=600&fit=crop&crop=center",
    author: "Sarah Johnson",
    date: "June 15, 2026",
    readTime: "5 min read",
    category: "Style Guide",
    tags: ["Layering", "Fashion Tips", "Seasonal Style"],
    featured: true,
  },
  {
    id: 2,
    title: "Sustainable Fashion: Making Conscious Choices",
    excerpt:
      "Explore the world of sustainable fashion and learn how to make eco-friendly choices without compromising on style. Tips for building a conscious wardrobe.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&crop=center",
    author: "Emma Thompson",
    date: "June 12, 2026",
    readTime: "7 min read",
    category: "Sustainability",
    tags: ["Eco-Friendly", "Sustainable", "Conscious Fashion"],
    featured: false,
  },
  {
    id: 3,
    title: "Accessorizing 101: Elevate Your Look",
    excerpt:
      "Master the art of accessorizing with our comprehensive guide. From statement jewelry to the perfect bag, learn how to complete any outfit.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center",
    author: "Mia Chen",
    date: "June 8, 2026",
    readTime: "4 min read",
    category: "Accessories",
    tags: ["Accessories", "Style Tips", "Fashion"],
    featured: false,
  },
  {
    id: 4,
    title: "Color Theory for Your Wardrobe",
    excerpt:
      "Understanding color theory can transform your wardrobe. Learn which colors complement your skin tone and how to create stunning color combinations.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop&crop=center",
    author: "David Williams",
    date: "June 5, 2026",
    readTime: "6 min read",
    category: "Style Guide",
    tags: ["Color Theory", "Wardrobe", "Fashion Tips"],
    featured: false,
  },
  {
    id: 5,
    title: "Capsule Wardrobe: Simplify Your Life",
    excerpt:
      "Build a timeless capsule wardrobe with our step-by-step guide. Discover how fewer, better pieces can transform your daily dressing experience.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=600&fit=crop&crop=center",
    author: "Lisa Park",
    date: "June 1, 2026",
    readTime: "8 min read",
    category: "Lifestyle",
    tags: ["Capsule Wardrobe", "Minimalism", "Organization"],
    featured: false,
  },
  {
    id: 6,
    title: "The Rise of Vintage Fashion",
    excerpt:
      "Vintage fashion is making a comeback. Explore how to incorporate retro pieces into your modern wardrobe for a unique and sustainable style.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=600&fit=crop&crop=center",
    author: "James O'Brien",
    date: "May 28, 2026",
    readTime: "5 min read",
    category: "Trends",
    tags: ["Vintage", "Retro", "Sustainable Fashion"],
    featured: false,
  },
  {
    id: 7,
    title: "Street Style: Urban Fashion Trends",
    excerpt:
      "From the streets to the runway, explore the latest urban fashion trends and how to incorporate them into your everyday style.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&crop=center",
    author: "Alex Rivera",
    date: "May 25, 2026",
    readTime: "6 min read",
    category: "Trends",
    tags: ["Street Style", "Urban Fashion", "Trends"],
    featured: false,
  },
  {
    id: 8,
    title: "The Perfect White Shirt: A Wardrobe Essential",
    excerpt:
      "Every wardrobe needs a perfect white shirt. Learn how to choose, style, and care for this timeless piece that never goes out of style.",
    image:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=800&h=600&fit=crop&crop=center",
    author: "Olivia Martinez",
    date: "May 20, 2026",
    readTime: "4 min read",
    category: "Style Guide",
    tags: ["White Shirt", "Wardrobe Essential", "Style"],
    featured: false,
  },
  {
    id: 9,
    title: "Eco-Friendly Fabrics: What You Need to Know",
    excerpt:
      "Discover the world of eco-friendly fabrics and learn how to make sustainable choices that are good for you and the planet.",
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&h=600&fit=crop&crop=center",
    author: "Dr. Green",
    date: "May 18, 2026",
    readTime: "7 min read",
    category: "Sustainability",
    tags: ["Eco-Friendly", "Fabrics", "Sustainability"],
    featured: false,
  },
];

// Categories for filtering
const categories = [
  "All",
  "Style Guide",
  "Sustainability",
  "Accessories",
  "Lifestyle",
  "Trends",
];

const Journal = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on category and search
  const filteredPosts = journalPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPost = journalPosts.find((post) => post.featured);

  return (
    <section className="min-h-screen bg-app-cream">
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-70 bg-linear-to-r from-app-green to-app-green-light">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <BookOpenIcon className="w-8 h-8 text-app-orange" />
            <span className="text-app-orange font-medium text-sm uppercase tracking-wider">
              VillageStore Journal
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white font-bold">
            Fashion Stories & Insights
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-3">
            Discover the latest trends, style tips, and inspiration from the
            world of fashion
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
            <span className="text-app-orange font-medium">Journal</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-app-orange text-white shadow-md"
                    : "bg-white text-app-text-light hover:bg-app-cream hover:text-app-text"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-app-border rounded-full text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
            />
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-10 md:mb-14">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square md:aspect-auto relative overflow-hidden bg-app-cream">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-app-orange text-white text-xs font-medium rounded-full">
                    Featured
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-app-text-light mb-3">
                    <span className="px-2 py-1 bg-app-cream rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif text-app-text mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-app-text-light text-sm mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-app-text-light">
                      <UserIcon className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <Link
                      to={`/journal/${featuredPost.id}`}
                      className="inline-flex items-center gap-2 text-app-orange hover:text-app-orange-dark font-medium transition-colors group"
                    >
                      Read Article
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-app-text-light">
            Showing{" "}
            <span className="font-medium text-app-text">
              {filteredPosts.length}
            </span>{" "}
            articles
          </p>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <Link to={`/journal/${post.id}`}>
                  <div className="relative aspect-4/3 overflow-hidden bg-app-cream">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-app-text text-xs font-medium rounded-full">
                      {post.category}
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>

                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-3 text-xs text-app-text-light mb-2">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link to={`/journal/${post.id}`}>
                    <h3 className="text-lg font-serif text-app-text mb-2 group-hover:text-app-orange transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-app-text-light text-sm line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-app-text-light">
                      <UserIcon className="w-3.5 h-3.5" />
                      <span>{post.author}</span>
                    </div>
                    <Link
                      to={`/journal/${post.id}`}
                      className="text-app-orange hover:text-app-orange-dark text-sm font-medium transition-colors flex items-center gap-1 group"
                    >
                      Read More
                      <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-app-border/50">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-[10px] text-app-text-light bg-app-cream px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-app-text mb-2">
              No Articles Found
            </h3>
            <p className="text-app-text-light text-sm max-w-md mx-auto">
              We couldn't find any articles matching your search. Try adjusting
              your filters or search terms.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="inline-block mt-4 px-6 py-2 bg-app-orange text-white rounded-full text-sm font-medium hover:bg-app-orange-dark transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Journal;
