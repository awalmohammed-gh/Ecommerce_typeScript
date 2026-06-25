import { useState } from "react";
import { useShop } from "../context/ShopContextProvider";
import type { Address } from "../Types/type";
import { AddressForm } from "./AddressForm";
import Loading from "../components/cards/Loading";
import AddressCard from "../components/cards/AddressCard";
import { MapPinIcon, PlusIcon, HomeIcon } from "lucide-react";

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

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    // If editing, update; else add new
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
    <div className="min-h-screen bg-app-cream pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HomeIcon className="w-6 h-6 text-app-orange" />
              <h2 className="text-2xl md:text-3xl font-serif text-app-text">
                My Addresses
              </h2>
            </div>
            <p className="text-sm text-app-text-light">
              Manage your delivery addresses for faster checkout
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <PlusIcon className="w-4 h-4" />
            Add Address
          </button>
        </div>

        {/* Address Form Modal */}
        {showForm && (
          <AddressForm
            resetForm={resetForm}
            formData={formData}
            handleChanges={handleChanges}
            handleSubmit={handleSubmit}
            editingId={editingId}
          />
        )}

        {/* Content */}
        {loading ? (
          <Loading />
        ) : addresses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-app-border/50 shadow-sm">
            <div className="max-w-sm mx-auto">
              <div className="w-24 h-24 bg-app-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="w-10 h-10 text-app-text-light" />
              </div>
              <h2 className="text-xl font-bold text-app-text mb-2">
                No Addresses Saved
              </h2>
              <p className="text-sm text-app-text-light mb-6">
                Add your first address for faster checkout
              </p>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-app-green text-white font-medium rounded-xl hover:bg-app-green-light transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <PlusIcon className="w-4 h-4" />
                Add Your First Address
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {addresses.map((addr) => (
              <AddressCard
                key={addr._id}
                removeAddress={removeAddress}
                addr={addr}
                handleAddressEdit={handleAddressEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Addresses;
