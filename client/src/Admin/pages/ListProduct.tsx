import { useEffect, useState } from "react";
import type { Product } from "../../Types/type";
import { dummyDashboardProductList } from "../../assets/data";
import Loading from "../../components/cards/Loading";
import { motion } from "framer-motion";
import {
  SearchIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PackageIcon,
  FilterIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ListProduct = () => {
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProductList = () => {
      setLoading(true);
      setListProduct(dummyDashboardProductList);
    };

    const timer = setTimeout(() => {
      fetchProductList();
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setListProduct(listProduct.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    }
  };

  // Filter products based on search
  const filteredProducts = listProduct.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-serif text-app-text">
            Product List
          </h1>
          <p className="text-sm text-app-text-light mt-1">
            Manage all your products in one place
          </p>
        </div>
        <Link
          to="/admin/add-product"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <span className="text-lg">+</span>
          Add Product
        </Link>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm p-4 mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-app-text-light">
            <PackageIcon className="w-4 h-4" />
            <span>{filteredProducts.length} products found</span>
          </div>
        </div>
      </motion.div>

      {/* Product Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        {currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <PackageIcon className="w-16 h-16 text-app-text-light/30 mx-auto mb-4" />
            <p className="text-app-text-light">No products found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-app-cream/50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-app-border/50">
                  {currentProducts.map((product, index) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="hover:bg-app-cream/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-app-cream border border-app-border/50 shrink-0">
                            <img
                              src={
                                product.images?.[0] ||
                                "https://via.placeholder.com/48"
                              }
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-app-text">
                              {product.name}
                            </p>
                            <p className="text-xs text-app-text-light">
                              ID: {product._id?.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-app-text capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-app-text">
                          {(product.offerPrice || product.price).toLocaleString("en-GH",{
                            style:"currency",
                            currency:"GHS"
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
                        >
                          {product.stock || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            product.stock > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
                          />
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/product-details/${product._id}`}
                            className="p-2 rounded-lg hover:bg-app-cream transition-colors"
                          >
                            <EyeIcon className="w-4 h-4 text-app-text-light hover:text-app-orange transition-colors" />
                          </Link>
                          <Link
                            to={`/admin/edit-product/${product._id}`}
                            className="p-2 rounded-lg hover:bg-app-cream transition-colors"
                          >
                            <EditIcon className="w-4 h-4 text-app-text-light hover:text-blue-500 transition-colors" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <TrashIcon className="w-4 h-4 text-app-text-light hover:text-red-500 transition-colors" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-app-border/50">
                <p className="text-sm text-app-text-light">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-app-border hover:bg-app-cream disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? "bg-app-orange text-white shadow-md"
                            : "hover:bg-app-cream text-app-text"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-app-border hover:bg-app-cream disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ListProduct;
