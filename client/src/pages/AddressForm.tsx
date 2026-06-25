// AddressForm.tsx
import type { ChangeEvent } from "react";
import type { Address } from "../Types/type";
import {
  XIcon,
  HomeIcon,
  BuildingIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddressFormProps {
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  formData: Address;
  editingId: string | null;
  handleChanges: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const AddressForm = ({
  resetForm,
  handleSubmit,
  formData,
  editingId,
  handleChanges,
}: AddressFormProps) => {
  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={resetForm}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, type: "spring", damping: 25 }}
          className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex items-center justify-between mb-6"
          >
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-xl md:text-2xl font-serif text-app-text"
            >
              {editingId ? "Edit Address" : "Add New Address"}
            </motion.h2>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetForm}
              className="p-2 rounded-lg hover:bg-app-cream transition-colors duration-200"
            >
              <XIcon className="w-5 h-5 text-app-text-light hover:text-red-500 transition-colors" />
            </motion.button>
          </motion.div>

          <motion.form
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* First + Last Name */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-xs font-medium text-app-text-light mb-1.5">
                  First Name *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChanges}
                  placeholder="Mohammed"
                  required
                  className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-app-text-light mb-1.5">
                  Last Name *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChanges}
                  placeholder="Awwal"
                  required
                  className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                />
              </div>
            </motion.div>

            {/* Phones */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-xs font-medium text-app-text-light mb-1.5">
                  Phone Number *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChanges}
                  placeholder="024 123 4567"
                  required
                  className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-app-text-light mb-1.5">
                  Additional Phone
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="tel"
                  name="additionalPhone"
                  value={formData.additionalPhone}
                  onChange={handleChanges}
                  placeholder="024 765 4321 (optional)"
                  className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                />
              </div>
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <label className="block text-xs font-medium text-app-text-light mb-1.5">
                Address Label *
              </label>
              <motion.select
                whileFocus={{ scale: 1.01 }}
                name="label"
                value={formData.label}
                onChange={handleChanges}
                required
                className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none bg-white"
              >
                <option value="Home">
                  <div className="flex items-center gap-2">
                    <HomeIcon className="w-4 h-4" /> Home
                  </div>
                </option>
                <option value="Office">
                  <BuildingIcon className="w-4 h-4" /> Office
                </option>
                <option value="Work">
                  <BriefcaseIcon className="w-4 h-4" /> Work
                </option>
                <option value="Other">
                  <MapPinIcon className="w-4 h-4" /> Other
                </option>
              </motion.select>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              <label className="block text-xs font-medium text-app-text-light mb-1.5">
                Street Address *
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChanges}
                placeholder="123 Main Street"
                required
                className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
              />
            </motion.div>

            {/* City + State */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-xs font-medium text-app-text-light mb-1.5">
                  City *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChanges}
                  placeholder="Accra"
                  required
                  className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-app-text-light mb-1.5">
                  Region / State *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChanges}
                  placeholder="Greater Accra"
                  required
                  className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                />
              </div>
            </motion.div>

            {/* Zip */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.3 }}
            >
              <label className="block text-xs font-medium text-app-text-light mb-1.5">
                Postal Code
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChanges}
                placeholder="GA-123-4567"
                className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
              />
            </motion.div>

            {/* Default Address */}
            <motion.label
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="flex items-center gap-2 cursor-pointer pt-2"
            >
              <motion.input
                whileHover={{ scale: 1.1 }}
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChanges}
                className="w-4 h-4 rounded border-app-border text-app-orange focus:ring-app-orange focus:ring-2 cursor-pointer"
              />
              <span className="text-sm text-app-text">
                Set as default address
              </span>
            </motion.label>

            {/* Buttons */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-app-border/50"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={resetForm}
                className="flex-1 px-6 py-2.5 border border-app-border text-app-text font-medium rounded-xl hover:bg-app-cream transition-colors duration-200"
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 px-6 py-2.5 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {editingId ? "Update Address" : "Save Address"}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
