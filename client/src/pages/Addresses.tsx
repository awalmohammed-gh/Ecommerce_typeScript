import { useState } from "react";
import { useShop } from "../context/ShopContextProvider";
import type { Address } from "../Types/type";
import { AddressForm } from "./AddressForm";
import Loading from "../components/cards/Loading";
import AddressCard from "../components/cards/AddressCard";
import { MapPinIcon, PlusIcon, HomeIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Addresses = () => {
  const { addresses, addAddress, removeAddress, updateAddress } = useShop();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Address>({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    additionalPhone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    label: "Home",
    isDefault: true,
  });

  const handleChanges = async (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingId) {
      updateAddress(formData);
    } else {
      addAddress({
        ...formData,
        _id: crypto.randomUUID(),
      });
    }
    setLoading(false);
    resetForm();
  };

  const handleAddressEdit = (addressId: string) => {
    const address = addresses.find((addr) => addr._id === addressId);
    if (!address) return;

    setEditingId(addressId);
    setFormData(address);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      _id: "",
      firstName: "",
      lastName: "",
      phone: "",
      additionalPhone: "",
      label: "Home",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-app-cream pb-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
              >
                <HomeIcon className="w-6 h-6 text-app-orange" />
              </motion.div>
              <motion.h2
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-2xl md:text-3xl font-serif text-app-text"
              >
                My Addresses
              </motion.h2>
            </div>
            <motion.p
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-sm text-app-text-light"
            >
              Manage your delivery addresses for faster checkout
            </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <PlusIcon className="w-4 h-4" />
            Add Address
          </motion.button>
        </motion.div>

        {/* Address Form Modal */}
        <AnimatePresence>
          {showForm && (
            <AddressForm
              resetForm={resetForm}
              formData={formData}
              handleChanges={handleChanges}
              handleSubmit={handleSubmit}
              editingId={editingId}
            />
          )}
        </AnimatePresence>

        {/* Content */}
        {loading ? (
          <Loading />
        ) : addresses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-20 bg-white rounded-2xl border border-app-border/50 shadow-sm"
          >
            <div className="max-w-sm mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
                className="w-24 h-24 bg-app-cream rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <MapPinIcon className="w-10 h-10 text-app-text-light" />
              </motion.div>
              <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-xl font-bold text-app-text mb-2"
              >
                No Addresses Saved
              </motion.h2>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-sm text-app-text-light mb-6"
              >
                Add your first address for faster checkout
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-app-green text-white font-medium rounded-xl hover:bg-app-green-light transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <PlusIcon className="w-4 h-4" />
                Add Your First Address
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            {addresses.map((addr) => (
              <motion.div
                key={addr._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3 },
                  },
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <AddressCard
                  removeAddress={removeAddress}
                  addr={addr}
                  handleAddressEdit={handleAddressEdit}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Addresses;
