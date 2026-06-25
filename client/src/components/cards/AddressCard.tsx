import { MapPinIcon, PenIcon, TrashIcon } from "lucide-react";
import type { Address } from "../../Types/type";
import { FaPhone } from "react-icons/fa";

interface AddressCardProps {
  handleAddressEdit: (addressId: string) => void;
  removeAddress: (addressId: string) => void;
  addr: Address;
}

const AddressCard = ({
  handleAddressEdit,
  addr,
  removeAddress,
}: AddressCardProps) => {
  return (
    <div className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-app-border/50 hover:border-app-orange/30">
      <div className="flex items-start justify-between">
        {/* Left Section */}
        <div className="flex gap-4 flex-1">
          <div className="shrink-0 w-10 h-10 bg-app-cream rounded-lg flex items-center justify-center group-hover:bg-app-orange/10 transition-colors duration-300">
            <MapPinIcon className="w-5 h-5 text-app-text-light group-hover:text-app-orange transition-colors duration-300" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-app-text text-sm md:text-base">
                {addr.label}
              </h3>

              {addr.isDefault && (
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  Default
                </span>
              )}
            </div>

            <p className="text-sm text-app-text font-medium mt-1.5">
              {addr.firstName} {addr.lastName}
            </p>

            <p className="text-sm text-app-text-light">{addr.address}</p>

            <p className="text-sm text-app-text-light">
              {addr.city}, {addr.state} {addr.zip}
            </p>

            <div className="mt-2 space-y-0.5">
              <p className="text-sm text-app-text-light flex items-center gap-2"><FaPhone/> {addr.phone}</p>
              {addr.additionalPhone && (
                <p className="text-sm flex items-center gap-2 text-app-text-light">
                  <FaPhone/> {addr.additionalPhone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-1 ml-4">
          <button
            onClick={() => handleAddressEdit(addr._id)}
            className="p-2 rounded-lg hover:bg-app-cream transition-colors duration-200"
            aria-label="Edit address"
          >
            <PenIcon className="w-4 h-4 text-app-text-light hover:text-app-orange transition-colors duration-200" />
          </button>
          <button
            onClick={() => removeAddress(addr._id)}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
            aria-label="Delete address"
          >
            <TrashIcon className="w-4 h-4 text-app-text-light hover:text-red-500 transition-colors duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
