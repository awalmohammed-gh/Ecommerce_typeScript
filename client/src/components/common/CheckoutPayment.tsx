import {
  CreditCardIcon,
  SmartphoneIcon,
  BanknoteIcon,
  CheckCircleIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import { useShop } from "../../context/ShopContextProvider";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const CheckoutPayment = () => {
  const {
    cartTotal,
    cartItems,
    deliveryFee,
    addresses,
    paymentMethod,
    setPaymentMethod,
  } = useShop();

  const navigate = useNavigate();
  const tax = cartTotal * 0.05;
  const total = cartTotal + tax;
  const grandTotal = cartTotal > 200 ? total : cartTotal + tax + deliveryFee;

  const paymentOptions = [
    {
      id: "cod",
      label: "Cash on Delivery",
      icon: BanknoteIcon,
      description: "Pay when you receive your order",
    },
    {
      id: "card",
      label: "Credit / Debit Card",
      icon: CreditCardIcon,
      description: "Pay securely with your card",
    },
    {
      id: "mobile",
      label: "Mobile Money",
      icon: SmartphoneIcon,
      description: "Pay via MTN, Vodafone, or AirtelTigo",
    },
  ];

  const defaultAddress = addresses.find((addr) => addr.isDefault);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Payment Methods */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex-1"
        >
          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-lg font-serif text-app-text mb-6 pb-4 border-b border-app-border/50"
          >
            Payment Method
          </motion.h3>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="space-y-4"
          >
            {paymentOptions.map((option) => {
              const isSelected = paymentMethod === option.id;
              const Icon = option.icon;

              return (
                <motion.label
                  key={option.id}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`
                    relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer
                    transition-all duration-300
                    ${
                      isSelected
                        ? "border-app-orange bg-app-orange/5 shadow-md"
                        : "border-app-border/50 bg-white hover:border-app-orange/30 hover:bg-app-cream/50"
                    }
                  `}
                  onClick={() => setPaymentMethod(option.id)}
                >
                  {/* Radio Circle */}
                  <motion.div
                    initial={isSelected ? { scale: 0.8 } : { scale: 1 }}
                    animate={isSelected ? { scale: 1 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 mt-0.5"
                  >
                    <div
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        transition-all duration-300
                        ${
                          isSelected
                            ? "border-app-orange bg-app-orange"
                            : "border-app-text-light/30 bg-white"
                        }
                      `}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckCircleIcon className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className={`
                      shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
                      transition-all duration-300
                      ${
                        isSelected
                          ? "bg-app-orange text-white"
                          : "bg-app-cream text-app-text-light"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          font-medium text-sm transition-colors duration-300
                          ${isSelected ? "text-app-orange" : "text-app-text"}
                        `}
                      >
                        {option.label}
                      </span>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, type: "spring" }}
                          className="text-[10px] bg-app-orange/10 text-app-orange px-2 py-0.5 rounded-full font-medium"
                        >
                          Selected
                        </motion.span>
                      )}
                    </div>
                    <p className="text-xs text-app-text-light mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </motion.label>
              );
            })}
          </motion.div>

          {/* Payment Details Section */}
          <AnimatePresence mode="wait">
            {paymentMethod === "card" && (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-app-cream/50 rounded-xl"
              >
                <h4 className="text-sm font-semibold text-app-text mb-3">
                  Card Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-app-text-light mb-1">
                      Card Number
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-app-text-light mb-1">
                        Expiry Date
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-app-text-light mb-1">
                        CVV
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {paymentMethod === "mobile" && (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-app-cream/50 rounded-xl"
              >
                <h4 className="text-sm font-semibold text-app-text mb-3">
                  Mobile Money Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-app-text-light mb-1">
                      Select Network
                    </label>
                    <motion.select
                      whileFocus={{ scale: 1.01 }}
                      className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none bg-white"
                    >
                      <option value="">Select network</option>
                      <option value="mtn">MTN Mobile Money</option>
                      <option value="vodafone">Vodafone Cash</option>
                      <option value="airteltigo">AirtelTigo Money</option>
                    </motion.select>
                  </div>
                  <div>
                    <label className="block text-xs text-app-text-light mb-1">
                      Phone Number
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="tel"
                      placeholder="024 123 4567"
                      className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none bg-white"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {paymentMethod === "cod" && (
              <motion.div
                key="cod"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-green-50 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
                    className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0"
                  >
                    <BanknoteIcon className="w-4 h-4 text-green-600" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-green-800 font-medium">
                      Pay on Delivery
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">
                      You will pay when your order arrives at your doorstep.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Side - Order Summary */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:w-80 xl:w-96 shrink-0"
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-app-cream/50 rounded-xl p-6 sticky top-24"
          >
            <motion.h3
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="text-lg font-serif text-app-text mb-6 pb-4 border-b border-app-border/50 flex items-center gap-2"
            >
              <ShoppingBagIcon className="w-5 h-5 text-app-orange" />
              Order Summary
            </motion.h3>

            {/* Delivery Address */}
            {defaultAddress && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mb-4 pb-4 border-b border-app-border/50"
              >
                <p className="text-xs font-medium text-app-text-light uppercase tracking-wider mb-2">
                  Delivery Address
                </p>
                <p className="text-sm text-app-text font-medium">
                  {defaultAddress.firstName} {defaultAddress.lastName}
                </p>
                <p className="text-xs text-app-text-light">
                  {defaultAddress.address}, {defaultAddress.city},{" "}
                  {defaultAddress.state}
                </p>
                <p className="text-xs text-app-text-light">
                  {defaultAddress.phone}
                </p>
              </motion.div>
            )}

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex justify-between text-sm"
              >
                <span className="text-app-text-light">Subtotal</span>
                <span className="font-medium text-app-text">
                  {cartTotal.toLocaleString("en-GH", {
                    style: "currency",
                    currency: "GHS",
                  })}
                </span>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex justify-between text-sm"
              >
                <span className="text-app-text-light">Items</span>
                <span className="font-medium text-app-text">
                  {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                </span>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex justify-between text-sm"
              >
                <span className="text-app-text-light">Shipping Fee</span>
                {cartTotal > 200 ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="font-medium text-green-600 flex items-center gap-1"
                  >
                    <TruckIcon className="w-3 h-3" />
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
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex justify-between text-sm"
              >
                <span className="text-app-text-light">Tax (5%)</span>
                <span className="font-medium text-app-text">
                  {tax.toLocaleString("en-GH", {
                    style: "currency",
                    currency: "GHS",
                  })}
                </span>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="border-t border-app-border/50 pt-3 mt-3"
              >
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-app-text">
                    Total
                  </span>
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-xl font-bold text-app-orange"
                  >
                    {grandTotal.toLocaleString("en-GH", {
                      style: "currency",
                      currency: "GHS",
                    })}
                  </motion.span>
                </div>
                {cartTotal > 200 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-green-600 mt-1"
                  >
                    Free shipping applied!
                  </motion.p>
                )}
                <p className="text-xs text-app-text-light mt-0.5">
                  * Includes all taxes and fees
                </p>
              </motion.div>
            </motion.div>

            {/* Cart Items Preview */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="mt-4 pt-4 border-t border-app-border/50"
            >
              <p className="text-xs font-medium text-app-text-light uppercase tracking-wider mb-2">
                Items in Cart
              </p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {cartItems.slice(0, 3).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-app-border/50 shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-app-text truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-app-text-light">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-xs font-medium text-app-text">
                      {(
                        (item.product.offerPrice || item.product.price) *
                        item.quantity
                      ).toLocaleString("en-GH", {
                        style: "currency",
                        currency: "GHS",
                      })}
                    </p>
                  </motion.div>
                ))}
                {cartItems.length > 3 && (
                  <p className="text-xs text-app-text-light text-center">
                    +{cartItems.length - 3} more items
                  </p>
                )}
              </div>
            </motion.div>

            {/* Place Order Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              onClick={() => {
                navigate("/order");
                window.scrollTo(0, 0);
              }}
              className="w-full mt-6 py-3.5 bg-app-orange text-white font-semibold rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Place Order
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xs text-app-text-light text-center mt-3"
            >
              By placing your order, you agree to our Terms & Conditions
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckoutPayment;
