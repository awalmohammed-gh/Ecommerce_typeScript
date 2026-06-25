import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContextProvider";
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  ShoppingBagIcon,
  HomeIcon,
  ChevronRightIcon,
} from "lucide-react";

import { transaction } from "../assets/data";

const MainCartPage = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    cartTotal,
    updateQuantity,
    deliveryFee,
  } = useShop();
  const navigate = useNavigate();
  const tax = cartTotal * 0.05;
  const total = cartTotal + tax;
  const grandTotal = cartTotal > 200 ? total : cartTotal + tax + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[60vh] bg-app-cream py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-app-cream flex items-center justify-center mx-auto mb-6">
              <ShoppingBagIcon className="w-12 h-12 text-app-text-light/40" />
            </div>
            <h2 className="text-2xl font-serif text-app-text mb-2">
              Your cart is empty
            </h2>
            <p className="text-app-text-light mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-app-orange text-white rounded-full hover:bg-app-orange-dark transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-app-cream py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link
            to="/"
            className="text-app-text-light hover:text-app-orange transition-colors flex items-center gap-1"
          >
            <HomeIcon className="w-4 h-4" />
            Home
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-app-text-light" />
          <span className="text-app-orange font-medium">Cart</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-4 md:p-6 border-b border-app-border/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-serif text-app-text">
                    My Shopping Cart
                  </h2>
                  <span className="text-sm text-app-text-light">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "Item" : "Items"}
                  </span>
                </div>
              </div>

              {/* Table Header - Desktop */}
              <div className="hidden md:grid grid-cols-5 gap-4 p-4 bg-app-cream/50 text-xs font-semibold text-app-text-light uppercase tracking-wider">
                <div className="col-span-2">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-center">Total</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-app-border/50">
                {cartItems.map((cart, index) => {
                  const itemPrice =
                    cart.product?.offerPrice || cart.product?.price;
                  const itemTotal = itemPrice * cart.quantity;

                  return (
                    <div key={index} className="p-4 md:p-6">
                      <div className="flex flex-col md:grid md:grid-cols-5 gap-4 md:gap-6 items-center">
                        {/* Product Info */}
                        <div className="flex items-center gap-4 md:col-span-2 w-full">
                          <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-app-cream border border-app-border/50">
                            <img
                              className="w-full h-full object-cover"
                              src={cart.product.images[0]}
                              alt={cart.product.name}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-app-text text-sm md:text-base truncate">
                              {cart.product?.name}
                            </p>
                            <p className="text-xs text-app-text-light mt-0.5">
                              Size:{" "}
                              <span className="font-medium">
                                {cart.selectedSize}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="md:text-center w-full md:w-auto">
                          <p className="text-sm font-semibold text-app-text">
                            {itemPrice.toLocaleString("en-GH", {
                              style: "currency",
                              currency: "GHS",
                            })}
                          </p>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-center gap-2 w-full md:w-auto">
                          <button
                            onClick={() =>
                              updateQuantity(
                                cart.product._id,
                                Math.max(1, cart.quantity - 1),
                                cart.selectedSize,
                              )
                            }
                            className="p-1 rounded-lg border border-app-border/50 hover:bg-app-cream transition-colors duration-200"
                            disabled={cart.quantity <= 1}
                          >
                            <MinusIcon className="w-4 h-4 text-app-text" />
                          </button>
                          <span className="text-sm font-medium text-app-text w-8 text-center">
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
                            className="p-1 rounded-lg border border-app-border/50 hover:bg-app-cream transition-colors duration-200"
                          >
                            <PlusIcon className="w-4 h-4 text-app-text" />
                          </button>
                        </div>

                        {/* Total */}
                        <div className="md:text-center w-full md:w-auto">
                          <p className="text-sm font-bold text-app-orange">
                            {itemTotal.toLocaleString("en-GH", {
                              style: "currency",
                              currency: "GHS",
                            })}
                          </p>
                        </div>

                        {/* Action */}
                        <div className="flex items-center justify-center md:justify-end w-full md:w-auto">
                          <button
                            onClick={() =>
                              removeFromCart(
                                cart.product._id,
                                cart.selectedSize,
                              )
                            }
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                            aria-label="Remove item"
                          >
                            <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-600 transition-colors" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clear Cart */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t border-app-border/50">
                  <button
                    onClick={() => clearCart()}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-serif text-app-text mb-6 pb-4 border-b border-app-border/50">
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-app-text-light">Subtotal</span>
                  <span className="font-medium text-app-text">
                    {cartTotal.toLocaleString("en-GH", {
                      style: "currency",
                      currency: "GHS",
                    })}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-app-text-light">Items</span>
                  <span className="font-medium text-app-text">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "Item" : "Items"}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-app-text-light">Shipping Fee</span>
                  {cartTotal > 200 ? (
                    <span className="font-medium text-green-600">Free</span>
                  ) : (
                    <span className="font-medium text-app-text">
                      {deliveryFee.toLocaleString("en-GH", {
                        style: "currency",
                        currency: "GHS",
                      })}
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-app-text-light">Tax (5%)</span>
                  <span className="font-medium text-app-text">
                    {tax.toLocaleString("en-GH", {
                      style: "currency",
                      currency: "GHS",
                    })}
                  </span>
                </div>

                <div className="border-t border-app-border/50 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-app-text">
                      Total
                    </span>
                    <span className=""></span>
                    {cartTotal > 200 ? (
                      <span className="text-xl font-bold text-app-orange">
                        {total.toLocaleString("en-GH", {
                          style: "currency",
                          currency: "GHS",
                        })}
                      </span>
                    ) : (
                      <span className="text-xl font-bold text-app-orange">
                        {grandTotal.toLocaleString("en-GH", {
                          style: "currency",
                          currency: "GHS",
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-app-text-light mt-1">
                    * Includes all taxes and fees
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => {
                    navigate("/checkout")
                  }}
                  className="w-full py-3 bg-app-orange text-white font-semibold rounded-xl hover:bg-app-orange-dark transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/products"
                  className="block w-full py-3 text-center border-2 border-app-green text-app-green font-semibold rounded-xl hover:bg-app-green hover:text-white transition-all duration-300"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-4 border-t border-app-border/50">
                <p className="text-xs text-app-text-light text-center mb-3">
                  Secure Payment Options
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="group relative">
                    <div className="w-14 h-9 bg-white border border-app-border/50 rounded-lg flex items-center justify-center p-1.5 hover:border-app-orange transition-all duration-200 hover:shadow-md">
                      <img
                        src={transaction.bank}
                        alt="Bank Transfer"
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-app-text-light whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Bank Transfer
                    </span>
                  </div>

                  <div className="group relative">
                    <div className="w-14 h-9 bg-white border border-app-border/50 rounded-lg flex items-center justify-center p-1.5 hover:border-app-orange transition-all duration-200 hover:shadow-md">
                      <img
                        src={transaction.card}
                        alt="Card Payment"
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-app-text-light whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Credit/Debit Card
                    </span>
                  </div>

                  <div className="group relative">
                    <div className="w-14 h-9 bg-white border border-app-border/50 rounded-lg flex items-center justify-center p-1.5 hover:border-app-orange transition-all duration-200 hover:shadow-md">
                      <img
                        src={transaction.phone}
                        alt="Mobile Money"
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-app-text-light whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Mobile Money
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCartPage;
