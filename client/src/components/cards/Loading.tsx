import { ShoppingBagIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-100 w-full">
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="text-3xl font-bold text-app-green animate-pulse">
          Village<span className="text-app-orange">Store</span>
        </div>

        {/* Spinner */}
        <div className="relative mt-2">
          <div className="w-16 h-16 border-4 border-app-green/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-app-orange border-t-transparent rounded-full animate-spin"></div>

          {/* Shopping bag icon in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ShoppingBagIcon className="w-6 h-6 text-app-green" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center mt-2">
          <p className="text-app-green font-medium text-sm animate-pulse">
            Loading...
          </p>
          <p className="text-app-text-light text-xs mt-1">
            Please wait while we prepare your fresh produce
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
