import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center bg-[url('./hero_banner.jpg')] bg-no-repeat bg-cover bg-center"
    >
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />

      {/* Content */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl"
      >
        {/* Brand Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center px-4 py-2 gap-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <SparklesIcon className="w-4 h-4 text-app-orange" />
          </motion.span>
          <p>
            Village<span className="text-app-orange">Store</span>
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
        >
          Modern fashion for <br className="hidden sm:block" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-app-orange"
          >
            everyday living.
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Discover carefully selected clothing and accessories designed for
          comfort, style, and confidence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/shop")}
            className="group relative px-8 py-4 bg-app-orange hover:bg-app-orange-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg flex items-center gap-3 text-base sm:text-lg"
          >
            <span>Explore Collection</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </motion.span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/new")}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 border border-white/30 hover:border-white/50 text-base sm:text-lg"
          >
            What's New
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
