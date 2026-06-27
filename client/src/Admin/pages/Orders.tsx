import { useEffect, useState } from "react";
import { dummyOrders } from "../../assets/data";
import { motion } from "framer-motion";
import {
  SearchIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  CalendarIcon,
  CreditCardIcon,
  FilterIcon,
  DownloadIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../../components/cards/Loading";
import type { Order } from "../../Types/type";

const Orders = () => {
  const [orders, setOrders] = useState<Order | []>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const itemsPerPage = 5;

  useEffect(() => {

    const fetchOrders = () =>{

        setLoading(true)
         setOrders(dummyOrders);
    }
    const timer = setTimeout(() => {
       fetchOrders()
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "processing":
        return "bg-yellow-500";
      case "shipped":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      case "pending":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const statuses = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

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
            Orders
          </h1>
          <p className="text-sm text-app-text-light mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-app-orange/10 text-app-orange text-xs font-medium rounded-full">
            {filteredOrders.length} Total
          </span>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-app-border rounded-xl text-sm text-app-text hover:bg-app-cream transition-colors">
            <DownloadIcon className="w-4 h-4" />
            Export
          </button>
        </div>
      </motion.div>

      {/* Filters */}
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
              placeholder="Search orders by ID, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <FilterIcon className="w-4 h-4 text-app-text-light shrink-0" />
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  statusFilter === status
                    ? "bg-app-orange text-white shadow-sm"
                    : "bg-app-cream text-app-text-light hover:bg-app-cream/80"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        {currentOrders.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBagIcon className="w-16 h-16 text-app-text-light/30 mx-auto mb-4" />
            <p className="text-app-text-light">No orders found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-app-cream/50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-app-border/50">
                  {currentOrders.map((order, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="hover:bg-app-cream/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-app-text">
                          {order.orderId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-app-text">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-app-text-light">
                            {order.customerEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-app-text-light">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-app-text">
                          ${order.totalAmount?.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-app-text-light flex items-center gap-1">
                          <CreditCardIcon className="w-3.5 h-3.5" />
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(order.status)}`}
                          />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/orders/${order.orderId}`}
                            className="inline-flex items-center gap-1 text-sm text-app-orange hover:text-app-orange-dark transition-colors"
                          >
                            <EyeIcon className="w-4 h-4" />
                            View
                          </Link>
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
                  {Math.min(endIndex, filteredOrders.length)} of{" "}
                  {filteredOrders.length} orders
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-app-border hover:bg-app-cream disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                          currentPage === pageNum
                            ? "bg-app-orange text-white shadow-md"
                            : "hover:bg-app-cream text-app-text"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
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

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"
      >
        {[
          { label: "Total Orders", value: orders.length, color: "blue" },
          {
            label: "Delivered",
            value: orders.filter((o) => o.status === "Delivered").length,
            color: "green",
          },
          {
            label: "Processing",
            value: orders.filter((o) => o.status === "Processing").length,
            color: "yellow",
          },
          {
            label: "Cancelled",
            value: orders.filter((o) => o.status === "Cancelled").length,
            color: "red",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-4 text-center"
          >
            <p className={`text-2xl font-bold text-${stat.color}-600`}>
              {stat.value}
            </p>
            <p className="text-xs text-app-text-light">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Orders;
