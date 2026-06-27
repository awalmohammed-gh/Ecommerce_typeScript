import { useState, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  XIcon,
  UploadIcon,
  SaveIcon,
} from "lucide-react";

interface ImageItem {
  file: File;
  preview: string;
}

const AddProduct = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    offerPrice: 0,
    category: "",
    subCategory: "",
    sizes: [] as string[],
    stock: 0,
    bestseller: false,
    isNew: false,
    targetAudience: "",
  });

  const [sizeInput, setSizeInput] = useState("");

  const handleChanges = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const addSize = () => {
    if (sizeInput.trim() && !formData.sizes.includes(sizeInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, sizeInput.trim()],
      }));
      setSizeInput("");
    }
  };

  const removeSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

  };

  const inputVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-serif text-app-text">
            Add New Product
          </h1>
          <p className="text-sm text-app-text-light mt-1">
            Fill in the details to add a new product to your store
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6"
      >
        {/* Images Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="space-y-3"
        >
          <label className="block text-sm font-semibold text-app-text">
            Product Images
            <span className="text-red-500 ml-1">*</span>
          </label>

          <div className="flex flex-wrap gap-4">
            {/* Image Upload Box */}
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-32 h-32 border-2 border-dashed border-app-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-app-orange transition-colors bg-app-cream/30"
            >
              <UploadIcon className="w-8 h-8 text-app-text-light/50" />
              <span className="text-xs text-app-text-light mt-1">Upload</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="hidden"
              />
            </motion.label>

            {/* Image Previews */}
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-32 h-32 rounded-xl overflow-hidden border border-app-border group"
                >
                  <img
                    src={image.preview}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XIcon className="w-3.5 h-3.5" />
                  </motion.button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {images.length === 0 && (
            <p className="text-xs text-app-text-light">
              Upload at least one product image (JPEG, PNG, WebP)
            </p>
          )}
        </motion.div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
            className="space-y-1.5"
          >
            <label className="block text-sm font-medium text-app-text">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChanges}
              placeholder="Enter product name"
              className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
              required
            />
          </motion.div>

          {/* Category */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
            className="space-y-1.5"
          >
            <label className="block text-sm font-medium text-app-text">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChanges}
              className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none bg-white"
              required
            >
              <option value="">Select category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Accessories">Accessories</option>
            </select>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          className="space-y-1.5"
        >
          <label className="block text-sm font-medium text-app-text">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChanges}
            placeholder="Describe your product"
            rows={4}
            className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none resize-none"
          />
        </motion.div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
            className="space-y-1.5"
          >
            <label className="block text-sm font-medium text-app-text">
              Price (GHS) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChanges}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
              required
            />
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
            className="space-y-1.5"
          >
            <label className="block text-sm font-medium text-app-text">
              Offer Price (GHS)
            </label>
            <input
              type="number"
              name="offerPrice"
              value={formData.offerPrice || ""}
              onChange={handleChanges}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
            />
          </motion.div>

          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
            className="space-y-1.5"
          >
            <label className="block text-sm font-medium text-app-text">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock || ""}
              onChange={handleChanges}
              placeholder="0"
              min="0"
              className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
              required
            />
          </motion.div>
        </div>

        {/* Sizes */}
        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          className="space-y-1.5"
        >
          <label className="block text-sm font-medium text-app-text">
            Sizes
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              placeholder="Enter size (e.g., S, M, L)"
              className="flex-1 px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSize())
              }
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={addSize}
              className="px-4 py-2.5 bg-app-orange text-white rounded-xl text-sm font-medium hover:bg-app-orange-dark transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.sizes.map((size) => (
              <motion.span
                key={size}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-app-cream rounded-full text-sm"
              >
                {size}
                <button
                  type="button"
                  onClick={() => removeSize(size)}
                  className="text-app-text-light hover:text-red-500 transition-colors"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Target Audience */}
        <motion.div
          custom={7}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          className="space-y-1.5"
        >
          <label className="block text-sm font-medium text-app-text">
            Target Audience
          </label>
          <select
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChanges}
            className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none bg-white"
          >
            <option value="">Select audience</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>
        </motion.div>

        {/* Checkboxes */}
        <motion.div
          custom={8}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          className="flex flex-wrap gap-6"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="bestseller"
              checked={formData.bestseller}
              onChange={handleChanges}
              className="w-4 h-4 rounded border-app-border text-app-orange focus:ring-app-orange cursor-pointer"
            />
            <span className="text-sm text-app-text">Bestseller</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isNew"
              checked={formData.isNew}
              onChange={handleChanges}
              className="w-4 h-4 rounded border-app-border text-app-orange focus:ring-app-orange cursor-pointer"
            />
            <span className="text-sm text-app-text">New Arrival</span>
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          custom={9}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          className="flex gap-3 pt-4 border-t border-app-border/50"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding Product...
              </>
            ) : (
              <>
                <SaveIcon className="w-4 h-4" />
                Add Product
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default AddProduct;
