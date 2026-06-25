// AddressForm.tsx
import type { ChangeEvent } from "react";
import type { Address } from "../Types/type";
import { XIcon } from "lucide-react";

interface AddressFormProps {
  resetForm: () => void;
  handleSubmit: (e: React.SubmitEvent) => void;
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
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={resetForm}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 animate-slide-in-up max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-serif text-app-text">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>

            <button
              onClick={resetForm}
              className="p-2 rounded-lg hover:bg-app-cream transition-colors duration-200"
            >
              <XIcon className="w-5 h-5 text-app-text-light hover:text-red-500 transition-colors" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-app-text-light mb-1.5">
                  First Name *
                </label>
                <input
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
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChanges}
                  placeholder="Awwal"
                  required
                  className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                />
              </div>
            </div>

            {/* Phones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-app-text-light mb-1.5">
                  Phone Number *
                </label>
                <input
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
                <input
                  type="tel"
                  name="additionalPhone"
                  value={formData.additionalPhone}
                  onChange={handleChanges}
                  placeholder="024 765 4321 (optional)"
                  className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                />
              </div>
            </div>

            {/* Label */}
            <div>
              <label className="block text-xs font-medium text-app-text-light mb-1.5">
                Address Label *
              </label>
              <select
                name="label"
                value={formData.label}
                onChange={handleChanges}
                required
                className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none bg-white"
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-medium text-app-text-light mb-1.5">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChanges}
                placeholder="123 Main Street"
                required
                className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
              />
            </div>

            {/* City + State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-app-text-light mb-1.5">
                  City *
                </label>
                <input
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
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChanges}
                  placeholder="Greater Accra"
                  required
                  className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                />
              </div>
            </div>

            {/* Zip */}
            <div>
              <label className="block text-xs font-medium text-app-text-light mb-1.5">
                Postal Code
              </label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChanges}
                placeholder="GA-123-4567"
                className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
              />
            </div>

            {/* Default Address */}
            <label className="flex items-center gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChanges}
                className="w-4 h-4 rounded border-app-border text-app-orange focus:ring-app-orange focus:ring-2 cursor-pointer"
              />
              <span className="text-sm text-app-text">
                Set as default address
              </span>
            </label>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-app-border/50">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-6 py-2.5 border border-app-border text-app-text font-medium rounded-xl hover:bg-app-cream transition-colors duration-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 px-6 py-2.5 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {editingId ? "Update Address" : "Save Address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
