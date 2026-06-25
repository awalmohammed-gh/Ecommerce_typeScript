import { Link } from "react-router-dom";
import {
  HomeIcon,
  ChevronRightIcon,
  UsersIcon,
  AwardIcon,
  HeartIcon,
  ShieldIcon,
  TruckIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://picsum.photos/seed/team1/300/300",
      bio: "Passionate about sustainable fashion with 15+ years of industry experience.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Creative Director",
      image: "https://picsum.photos/seed/team2/300/300",
      bio: "Award-winning designer with a keen eye for contemporary trends.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Head of Sustainability",
      image: "https://picsum.photos/seed/team3/300/300",
      bio: "Committed to making fashion more ethical and environmentally conscious.",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Operations Manager",
      image: "https://picsum.photos/seed/team4/300/300",
      bio: "Ensuring seamless delivery and exceptional customer experience.",
    },
  ];

  const values = [
    {
      id: 1,
      icon: HeartIcon,
      title: "Quality First",
      description:
        "We source only the finest materials and craftsmanship for every piece.",
    },
    {
      id: 2,
      icon: ShieldIcon,
      title: "Authenticity",
      description:
        "Every product is genuine, transparently sourced, and ethically made.",
    },
    {
      id: 3,
      icon: UsersIcon,
      title: "Community",
      description:
        "Building a community of fashion lovers who value style and substance.",
    },
    {
      id: 4,
      icon: AwardIcon,
      title: "Excellence",
      description:
        "Striving for excellence in everything we do, from design to delivery.",
    },
  ];

  const stats = [
    { id: 1, number: "10K+", label: "Happy Customers" },
    { id: 2, number: "500+", label: "Products" },
    { id: 3, number: "4.9★", label: "Average Rating" },
    { id: 4, number: "50+", label: "Team Members" },
  ];

  return (
    <section className="min-h-screen bg-app-cream">
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-70 bg-linear-to-r from-app-green to-app-green-light">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white font-bold">
            About <span className="text-app-orange">VillageStore</span>
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-3">
            Discover the story behind our brand and our commitment to quality,
            sustainability, and style
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
            <span className="text-app-orange font-medium">About</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Our Story */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <span className="text-app-orange font-medium text-sm uppercase tracking-wider mb-2">
                Our Story
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-app-text mb-4">
                Where Fashion Meets{" "}
                <span className="text-app-orange">Purpose</span>
              </h2>
              <p className="text-app-text-light text-sm leading-relaxed mb-4">
                Founded in 2020, VillageStore was born from a simple idea: to
                create a fashion destination that celebrates individuality,
                quality, and conscious living.
              </p>
              <p className="text-app-text-light text-sm leading-relaxed">
                We believe that what you wear should not only make you look good
                but also feel good about the choices you make. Every piece in
                our collection is carefully curated to blend timeless style with
                modern sustainability.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <TruckIcon className="w-5 h-5 text-app-orange" />
                  <span className="text-sm text-app-text-light">
                    Fast Delivery
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-app-orange" />
                  <span className="text-sm text-app-text-light">
                    24/7 Support
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldIcon className="w-5 h-5 text-app-orange" />
                  <span className="text-sm text-app-text-light">
                    100% Authentic
                  </span>
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-auto bg-app-cream">
              <img
                src="https://picsum.photos/seed/about-story/800/600"
                alt="Our Story"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300"
            >
              <p className="text-2xl md:text-3xl font-bold text-app-orange">
                {stat.number}
              </p>
              <p className="text-sm text-app-text-light mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <span className="text-app-orange font-medium text-sm uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-app-text mt-2">
              What We <span className="text-app-orange">Stand For</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.id}
                  className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="w-14 h-14 rounded-full bg-app-orange/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-app-orange transition-colors duration-300">
                    <Icon className="w-7 h-7 text-app-orange group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-app-text mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-app-text-light">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <span className="text-app-orange font-medium text-sm uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-app-text mt-2">
              Meet the <span className="text-app-orange">People</span> Behind
              VillageStore
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="relative aspect-square overflow-hidden bg-app-cream">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-app-text">{member.name}</h3>
                  <p className="text-sm text-app-orange font-medium">
                    {member.role}
                  </p>
                  <p className="text-xs text-app-text-light mt-1">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-12">
          <div className="text-center mb-8">
            <span className="text-app-orange font-medium text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-app-text mt-2">
              The <span className="text-app-orange">VillageStore</span>{" "}
              Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-app-cream flex items-center justify-center mx-auto mb-3">
                <StarIcon className="w-8 h-8 text-app-orange" />
              </div>
              <h3 className="font-semibold text-app-text">Curated Quality</h3>
              <p className="text-sm text-app-text-light mt-1">
                Every product is carefully selected for quality, style, and
                durability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-app-cream flex items-center justify-center mx-auto mb-3">
                <HeartIcon className="w-8 h-8 text-app-orange" />
              </div>
              <h3 className="font-semibold text-app-text">Ethical Sourcing</h3>
              <p className="text-sm text-app-text-light mt-1">
                We partner with suppliers who share our commitment to fair labor
                practices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-app-cream flex items-center justify-center mx-auto mb-3">
                <TruckIcon className="w-8 h-8 text-app-orange" />
              </div>
              <h3 className="font-semibold text-app-text">
                Seamless Experience
              </h3>
              <p className="text-sm text-app-text-light mt-1">
                Fast shipping, easy returns, and exceptional customer support.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-app-green to-app-green-light rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-3">
            Ready to Experience{" "}
            <span className="text-app-orange">VillageStore</span>?
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Join thousands of satisfied customers who have discovered the
            perfect blend of style, quality, and sustainability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Shop Now
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
