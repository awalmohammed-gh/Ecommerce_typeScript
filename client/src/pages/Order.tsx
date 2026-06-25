import {
  BoxIcon,
  MapPinIcon,
  CreditCardIcon,
  CheckCircleIcon,
  PackageIcon,
  TruckIcon,
  PhoneCall,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { useShop } from "../context/ShopContextProvider";
import { Link } from "react-router-dom";
import { BiMobile, BiMoney } from "react-icons/bi";
import { useState } from "react";
import { motion } from "framer-motion";

const Order = () => {
  const { cartItems, addresses, paymentMethod, cartTotal, deliveryFee } =
    useShop();

  const tax = cartTotal * 0.05;
  const grandTotal =
    cartTotal > 200 ? cartTotal + tax : cartTotal + tax + deliveryFee;

  const defaultAddress = addresses.find((addr) => addr.isDefault);

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "cod":
        return "Cash on Delivery";
      case "mobile":
        return "Mobile Money";
      case "card":
        return "Credit / Debit Card";
      default:
        return "No payment method selected";
    }
  };

  if (cartItems.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-app-cream py-8 md:py-12 flex items-center justify-center"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
              className="w-24 h-24 rounded-full bg-app-cream flex items-center justify-center mx-auto mb-6"
            >
              <ShoppingBagIcon className="w-12 h-12 text-app-text-light/40" />
            </motion.div>
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="text-2xl font-serif text-app-text mb-3"
            >
              No Orders Yet
            </motion.h2>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="text-sm text-app-text-light mb-6"
            >
              You haven't placed any orders yet. Start shopping to see your
              orders here.
            </motion.p>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                Start Shopping
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-app-cream py-8 md:py-12"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
              className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"
            >
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-2xl md:text-3xl font-serif text-app-text"
              >
                Order Confirmed!
              </motion.h1>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-sm text-app-text-light"
              >
                Thank you for your purchase
              </motion.p>
            </div>
          </motion.div>

          {/* Order Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Order Header */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center justify-between p-4 md:p-6 bg-app-cream/50 border-b border-app-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-app-orange/10 flex items-center justify-center">
                  <PackageIcon className="w-5 h-5 text-app-orange" />
                </div>
                <div>
                  <p className="text-sm font-medium text-app-text">
                    Order #{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                  <p className="text-xs text-app-text-light">
                    Order placed on {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Confirmed
              </span>
            </motion.div>

            {/* Address, Product, Payment - 3 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-app-border/50">
              {/* Delivery Address */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="p-4 md:p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPinIcon className="w-4 h-4 text-app-orange" />
                  <h3 className="text-sm font-semibold text-app-text">
                    Delivery Address
                  </h3>
                </div>

                {defaultAddress ? (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="bg-app-cream/30 rounded-xl p-4"
                  >
                    <p className="font-medium text-app-text">
                      {defaultAddress.firstName} {defaultAddress.lastName}
                    </p>
                    <p className="text-sm text-app-text-light">
                      {defaultAddress.address}
                    </p>
                    <p className="text-sm text-app-text-light">
                      {defaultAddress.city}, {defaultAddress.state}{" "}
                      {defaultAddress.zip}
                    </p>
                    <p className="text-sm text-app-text-light mt-1 flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5" />{" "}
                      {defaultAddress.phone}
                    </p>
                    {defaultAddress.additionalPhone && (
                      <p className="text-sm text-app-text-light flex items-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5" />{" "}
                        {defaultAddress.additionalPhone}
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <p className="text-sm text-app-text-light">
                    No address selected
                  </p>
                )}
              </motion.div>

              {/* Product & Quantity */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="p-4 md:p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BoxIcon className="w-4 h-4 text-app-orange" />
                  <h3 className="text-sm font-semibold text-app-text">
                    Products
                  </h3>
                </div>

                <div className="space-y-3">
                  {cartItems.map((item, index) => {
                    const itemPrice =
                      item.product.offerPrice || item.product.price;
                    const itemTotal = itemPrice * item.quantity;

                    return (
                      <motion.div
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: 0.6 + index * 0.05,
                          duration: 0.3,
                        }}
                        className="bg-app-cream/30 rounded-xl p-3"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-app-border/50 shrink-0"
                          >
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-app-text text-sm truncate">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-app-text-light">
                              Size: {item.selectedSize}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-app-text-light">
                                Qty: {item.quantity}
                              </span>
                              <span className="w-px h-3 bg-app-border/50" />
                              <span className="text-sm font-semibold text-app-orange">
                                {itemTotal.toLocaleString("en-GH", {
                                  style: "currency",
                                  currency: "GHS",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="p-4 md:p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CreditCardIcon className="w-4 h-4 text-app-orange" />
                  <h3 className="text-sm font-semibold text-app-text">
                    Payment Method
                  </h3>
                </div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="bg-app-cream/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0"
                    >
                      {paymentMethod === "cod" ? (
                        <BiMoney className="w-5 h-5 text-app-orange" />
                      ) : paymentMethod === "mobile" ? (
                        <BiMobile className="w-5 h-5 text-app-orange" />
                      ) : (
                        <CreditCardIcon className="w-5 h-5 text-app-orange" />
                      )}
                    </motion.div>
                    <div>
                      <p className="font-medium text-app-text">
                        {getPaymentMethodLabel(paymentMethod)}
                      </p>
                      <p className="text-xs text-app-text-light">
                        {paymentMethod === "cod"
                          ? "Pay when you receive your order"
                          : paymentMethod === "mobile"
                            ? "You will receive a payment request"
                            : "Payment will be processed securely"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="p-4 md:p-6 bg-app-cream/30 border-t border-app-border/50"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-app-text">
                  Order Summary
                </h3>

                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm text-app-text-light">
                      Subtotal:
                    </span>
                    <span className="font-medium text-app-text">
                      {cartTotal.toLocaleString("en-GH", {
                        style: "currency",
                        currency: "GHS",
                      })}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm text-app-text-light">
                      Shipping:
                    </span>
                    {cartItems.length === 0 ? (
                      "0.00"
                    ) : (
                      <>
                        {cartTotal > 200 ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.9 }}
                            className="font-medium text-green-600"
                          >
                            Free
                          </motion.span>
                        ) : (
                          <span className="font-medium text-app-text">
                            {deliveryFee.toLocaleString("en-GH", {
                              style: "currency",
                              currency: "GHS",
                            })}
                          </span>
                        )}
                      </>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm text-app-text-light">
                      Tax (5%):
                    </span>
                    {cartItems.length === 0 ? (
                      "0.00"
                    ) : (
                      <span className="font-medium text-app-text">
                        {tax.toLocaleString("en-GH", {
                          style: "currency",
                          currency: "GHS",
                        })}
                      </span>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.0, type: "spring", duration: 0.4 }}
                    className="flex items-center gap-2 pl-4 border-l border-app-border/50"
                  >
                    <span className="text-base font-semibold text-app-text">
                      Total:
                    </span>
                    {cartItems.length === 0 ? (
                      "0.00"
                    ) : (
                      <>
                        <span className="text-xl font-bold text-app-orange">
                          {grandTotal.toLocaleString("en-GH", {
                            style: "currency",
                            currency: "GHS",
                          })}
                        </span>
                      </>
                    )}
                  </motion.div>
                </div>
              </div>
              {cartTotal > 200 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                  className="text-xs text-green-600 text-right mt-2"
                >
                  Free shipping applied!
                </motion.p>
              )}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="p-4 md:p-6 flex flex-col sm:flex-row gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Link
                  to="/products"
                  className="block text-center px-6 py-3 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Delivery Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                icon: PackageIcon,
                color: "blue",
                label: "Order Confirmed",
                desc: "Your order has been confirmed",
              },
              {
                icon: TruckIcon,
                color: "yellow",
                label: "Processing",
                desc: "Your order is being processed",
              },
              {
                icon: CheckCircleIcon,
                color: "green",
                label: "Delivered",
                desc: "Estimated delivery in 2-3 days",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-4 text-center shadow-sm"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className={`w-10 h-10 rounded-full bg-${item.color}-50 flex items-center justify-center mx-auto mb-2`}
                >
                  <item.icon className={`w-5 h-5 text-${item.color}-500`} />
                </motion.div>
                <p className="text-sm font-medium text-app-text">
                  {item.label}
                </p>
                <p className="text-xs text-app-text-light">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Order;
