import {
  CheckIcon,
  CreditCard,
  MapPinIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CheckoutAddress from "../components/common/CheckoutAddress";
import CheckoutPayment from "../components/common/CheckoutPayment";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const [step, setStep] = useState("address");
  const navigate = useNavigate();

  const steps: { key: string; label: string; icon: any }[] = [
    { key: "address", label: "Address", icon: MapPinIcon },
    { key: "payment", label: "Payment", icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-app-cream py-8 md:py-12"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="w-1 h-8 bg-app-orange rounded-full"
            />
            <h2 className="text-2xl md:text-3xl font-serif text-app-text">
              Checkout
            </h2>
          </div>
          <p className="text-sm text-app-text-light ml-4">
            Complete your purchase in a few easy steps
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center justify-between md:justify-start gap-2 md:gap-4 mb-8 bg-white rounded-2xl shadow-sm p-4 md:p-6"
        >
          {steps.map((s, index) => {
            const isActive = step === s.key;
            const isCompleted = currentStepIndex > index;
            const Icon = s.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none"
              >
                <motion.button
                  whileHover={!isActive && !isCompleted ? {} : { scale: 1.02 }}
                  whileTap={!isActive && !isCompleted ? {} : { scale: 0.98 }}
                  onClick={() => setStep(s.key)}
                  disabled={!isActive && !isCompleted}
                  className={`
                    flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-2.5 rounded-xl
                    transition-all duration-300 relative group flex-1 md:flex-none justify-center
                    ${
                      isActive
                        ? "bg-app-orange text-white shadow-md cursor-pointer"
                        : isCompleted
                          ? "bg-green-50 text-green-700 cursor-pointer hover:bg-green-100"
                          : "bg-app-cream text-app-text-light/50 cursor-not-allowed"
                    }
                  `}
                >
                  <motion.div
                    initial={isActive ? { scale: 0.8 } : { scale: 1 }}
                    animate={isActive ? { scale: 1 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`
                      w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center
                      transition-all duration-300 shrink-0
                      ${
                        isActive
                          ? "bg-white/20"
                          : isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-white/50"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CheckIcon className="w-3 h-3 md:w-4 md:h-4" />
                    ) : (
                      <Icon className="w-3 h-3 md:w-4 md:h-4" />
                    )}
                  </motion.div>
                  <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                    {s.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeStep"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-white/50 rounded-full"
                    />
                  )}
                </motion.button>

                {index < steps.length - 1 && (
                  <ChevronRightIcon className="w-4 h-4 text-app-text-light/30 hidden sm:block" />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === "address" && <CheckoutAddress setStep={setStep} />}
              {step === "payment" && <CheckoutPayment />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Back to Cart */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate("/cart");
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-2 text-sm text-app-text-light hover:text-app-orange transition-colors duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">
              ←
            </span>
            Back to Cart
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Checkout;
