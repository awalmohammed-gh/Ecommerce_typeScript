import {
  TrashIcon,
  X,
  ShoppingBagIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { useShop } from "../context/ShopContextProvider";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    cartTotal,
    updateQuantity,
  } = useShop();
  const navigate = useNavigate();

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-app-border/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg hover:bg-app-cream transition-colors duration-200"
            >
              <X className="w-5 h-5 text-app-text" />
            </button>
            <h3 className="text-lg font-semibold text-app-text">Your Cart</h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-app-cream rounded-full">
            <ShoppingBagIcon className="w-4 h-4 text-app-orange" />
            <span className="text-sm font-medium text-app-text">
              {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-app-cream flex items-center justify-center mb-4">
                <ShoppingBagIcon className="w-10 h-10 text-app-text-light/40" />
              </div>
              <h4 className="text-lg font-semibold text-app-text">
                Your cart is empty
              </h4>
              <p className="text-sm text-app-text-light mt-1">
                Start shopping to add items to your cart
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2 bg-app-orange text-white rounded-full hover:bg-app-orange-dark transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((cart) => (
              <div
                key={`${cart.product._id}-${cart.selectedSize}`}
                className="flex gap-4 p-3 bg-app-cream/50 rounded-xl hover:bg-app-cream transition-colors duration-200"
              >
                {/* Image */}
                <div className="shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-white border border-app-border/50">
                  <img
                    className="w-full h-full object-cover"
                    src={cart.product.images[0]}
                    alt={cart.product.name}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-app-text text-sm truncate">
                    {cart.product?.name}
                  </p>
                  <p className="text-xs text-app-text-light mt-0.5">
                    Size: {cart.selectedSize}
                  </p>
                  <p className="text-sm font-semibold text-app-orange mt-1">
                    {cart.product?.offerPrice?.toLocaleString("en-GH", {
                      style: "currency",
                      currency: "GHS",
                    }) ||
                      cart.product?.price?.toLocaleString("en-GH", {
                        style: "currency",
                        currency: "GHS",
                      })}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          cart.product._id,
                          Math.max(1, cart.quantity - 1),
                          cart.selectedSize,
                        )
                      }
                      className="p-1 rounded-md border border-app-border/50 hover:bg-white transition-colors duration-200"
                    >
                      <MinusIcon className="w-3.5 h-3.5 text-app-text" />
                    </button>
                    <span className="text-sm font-medium text-app-text w-6 text-center">
                      {cart.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          cart.product._id,
                          cart.quantity + 1,
                          cart.selectedSize,
                        )
                      }
                      className="p-1 rounded-md border border-app-border/50 hover:bg-white transition-colors duration-200"
                    >
                      <PlusIcon className="w-3.5 h-3.5 text-app-text" />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() =>
                    removeFromCart(cart.product._id, cart.selectedSize)
                  }
                  className="shrink-0 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200 self-start"
                  aria-label="Remove item"
                >
                  <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-600 transition-colors" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-app-border/50 p-4 bg-white/95 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-app-text-light">Subtotal</span>
              <span className="text-lg font-bold text-app-text">
                {cartTotal.toLocaleString("en-GH", {
                  style: "currency",
                  currency: "GHS",
                })}
              </span>
            </div>

            <p className="text-xs text-app-text-light mb-4">
              Shipping calculated at checkout
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/cart");
                }}
                className="w-full py-3 bg-app-orange text-white font-semibold rounded-xl hover:bg-app-orange-dark transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
              >
                View Cart
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/checkout");
                }}
                className="w-full py-3 bg-app-orange text-white font-semibold rounded-xl hover:bg-app-orange-dark transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
