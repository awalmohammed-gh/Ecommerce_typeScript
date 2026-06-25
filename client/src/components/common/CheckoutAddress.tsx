import {
  MapPinIcon,
  PlusIcon,
  ChevronRightIcon,
  HomeIcon,
  BuildingIcon,
  BriefcaseIcon,
} from "lucide-react";
import { useShop } from "../../context/ShopContextProvider";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { motion } from "motion/react";

const CheckoutAddress = ({ setStep }:any) => {
  const { addresses } = useShop();
  const navigate = useNavigate();

  const getLabelIcon = (label: string) => {
    switch (label?.toLowerCase()) {
      case "home":
        return HomeIcon;
      case "office":
        return BuildingIcon;
      case "work":
        return BriefcaseIcon;
      default:
        return HomeIcon;
    }
  };

  const defaultAddress = addresses.find((addr) => addr.isDefault);
  const otherAddresses = addresses.filter((addr) => !addr.isDefault);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
    >
      {/* Header */}
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center gap-3 mb-6 pb-4 border-b border-app-border/50"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
          className="w-10 h-10 rounded-xl bg-app-orange/10 flex items-center justify-center"
        >
          <MapPinIcon className="w-5 h-5 text-app-orange" />
        </motion.div>
        <div>
          <h2 className="text-lg font-serif text-app-text">Delivery Address</h2>
          <p className="text-xs text-app-text-light">
            Where should we deliver your order?
          </p>
        </div>
      </motion.div>

      {/* Address Content */}
      {addresses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
            className="w-20 h-20 rounded-full bg-app-cream flex items-center justify-center mx-auto mb-4"
          >
            <MapPinIcon className="w-8 h-8 text-app-text-light/40" />
          </motion.div>
          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-base font-semibold text-app-text mb-2"
          >
            No Address Added
          </motion.h3>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="text-sm text-app-text-light mb-6 max-w-sm mx-auto"
          >
            Add a delivery address to proceed with your order
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/my-addresses")}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <PlusIcon className="w-4 h-4" />
            Add Address
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="space-y-4"
        >
          {/* Default Address */}
          {defaultAddress && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ y: -2 }}
              className="relative border-2 border-app-orange rounded-xl p-5 bg-app-orange/5"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3, type: "spring" }}
                className="absolute -top-2.5 left-4 px-3 py-0.5 bg-app-orange text-white text-[10px] font-medium rounded-full"
              >
                Default
              </motion.div>

              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 w-10 h-10 rounded-xl bg-app-orange/10 flex items-center justify-center"
                >
                  {(() => {
                    const Icon = getLabelIcon(defaultAddress.label);
                    return <Icon className="w-5 h-5 text-app-orange" />;
                  })()}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-app-text text-sm md:text-base">
                      {defaultAddress.label || "Home"}
                    </h3>
                  </div>

                  <p className="text-sm text-app-text font-medium mt-1.5">
                    {defaultAddress.firstName} {defaultAddress.lastName}
                  </p>

                  <p className="text-sm text-app-text-light">
                    {defaultAddress.address}
                  </p>

                  <p className="text-sm text-app-text-light">
                    {defaultAddress.city}, {defaultAddress.state}{" "}
                    {defaultAddress.zip}
                  </p>

                  <div className="mt-2 space-y-0.5">
                    <p className="text-sm text-app-text-light flex items-center gap-2">
                      <FaPhone className="w-3.5 h-3.5" /> {defaultAddress.phone}
                    </p>
                    {defaultAddress.additionalPhone && (
                      <p className="text-sm flex items-center gap-2 text-app-text-light">
                        <FaPhone className="w-3.5 h-3.5" />{" "}
                        {defaultAddress.additionalPhone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Addresses */}
          {otherAddresses.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="space-y-2"
            >
              <p className="text-xs font-medium text-app-text-light uppercase tracking-wider px-1">
                Other Addresses
              </p>
              {otherAddresses.map((addr, index) => {
                const Icon = getLabelIcon(addr.label);
                return (
                  <motion.div
                    key={index}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 4 }}
                    className="border border-app-border/50 rounded-xl p-4 hover:border-app-orange/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-9 h-9 rounded-lg bg-app-cream flex items-center justify-center">
                        <Icon className="w-4 h-4 text-app-text-light" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-app-text text-sm">
                            {addr.label || "Home"}
                          </h3>
                        </div>

                        <p className="text-sm text-app-text font-medium mt-0.5">
                          {addr.firstName} {addr.lastName}
                        </p>

                        <p className="text-sm text-app-text-light">
                          {addr.address}
                        </p>

                        <p className="text-sm text-app-text-light">
                          {addr.city}, {addr.state} {addr.zip}
                        </p>

                        <div className="mt-1.5 space-y-0.5">
                          <p className="text-sm text-app-text-light flex items-center gap-2">
                            <FaPhone className="w-3.5 h-3.5" /> {addr.phone}
                          </p>
                          {addr.additionalPhone && (
                            <p className="text-sm flex items-center gap-2 text-app-text-light">
                              <FaPhone className="w-3.5 h-3.5" />{" "}
                              {addr.additionalPhone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Change Address Button */}
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/my-addresses")}
            className="mt-2 text-sm text-app-orange hover:text-app-orange-dark font-medium transition-colors flex items-center gap-1"
          >
            Manage Addresses
            <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}

      {/* Proceed Button */}
      {addresses.length > 0 && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-6 pt-4 border-t border-app-border/50"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStep("payment")}
            className="w-full py-3.5 bg-app-orange text-white font-semibold rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Proceed to Payment
            <ChevronRightIcon className="w-5 h-5" />
          </motion.button>
          <p className="text-xs text-app-text-light text-center mt-2">
            Your order will be delivered to the selected address
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CheckoutAddress;
