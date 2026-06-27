import { useEffect, useState } from "react";
import { dummyUserOrders } from "../../assets/data";
import { motion } from "framer-motion";
import {
  SearchIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UsersIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../../components/cards/Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Extract unique users from orders
      const uniqueUsers = dummyUserOrders.reduce((acc, order) => {
        const existingUser = acc.find((u) => u.email === order.customerEmail);
        if (!existingUser) {
          acc.push({
            id: order.orderId,
            name: order.customerName,
            email: order.customerEmail,
            phone: order.phoneNumber,
            address: order.shippingAddress,
            joinDate: order.orderDate,
            totalOrders: 1,
            totalSpent: order.totalAmount,
            lastOrder: order.orderDate,
            status: "Active",
          });
        } else {
          existingUser.totalOrders += 1;
          existingUser.totalSpent += order.totalAmount;
          if (new Date(order.orderDate) > new Date(existingUser.lastOrder)) {
            existingUser.lastOrder = order.orderDate;
          }
        }
        return acc;
      }, []);
      setUsers(uniqueUsers);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

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
            Users
          </h1>
          <p className="text-sm text-app-text-light mt-1">
            Manage all registered users
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-app-orange/10 text-app-orange text-xs font-medium rounded-full">
            {users.length} Total Users
          </span>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm p-4 mb-6"
      >
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light" />
          <input
            type="text"
            placeholder="Search users by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-app-border rounded-xl text-sm focus:border-app-orange focus:ring-2 focus:ring-orange-100 transition-all outline-none"
          />
        </div>
      </motion.div>

      {/* Users Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {currentUsers.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-sm">
            <UsersIcon className="w-16 h-16 text-app-text-light/30 mx-auto mb-4" />
            <p className="text-app-text-light">No users found</p>
          </div>
        ) : (
          currentUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
            >
              {/* User Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-app-orange/10 flex items-center justify-center shrink-0">
                    <span className="text-app-orange font-semibold text-lg">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-app-text">{user.name}</h3>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-gray-500"}`}
                      />
                      {user.status}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/admin/users/${user.id}`}
                  className="p-2 rounded-lg hover:bg-app-cream transition-colors"
                >
                  <EyeIcon className="w-4 h-4 text-app-text-light hover:text-app-orange transition-colors" />
                </Link>
              </div>

              {/* User Details */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-app-text-light">
                  <MailIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-app-text-light">
                  <PhoneIcon className="w-4 h-4 shrink-0" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-app-text-light">
                  <MapPinIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{user.address}</span>
                </div>
              </div>

              {/* User Stats */}
              <div className="mt-4 pt-4 border-t border-app-border/50 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-sm font-semibold text-app-text">
                    {user.totalOrders}
                  </p>
                  <p className="text-xs text-app-text-light">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-app-text">
                    ${user.totalSpent.toFixed(2)}
                  </p>
                  <p className="text-xs text-app-text-light">Spent</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-app-text">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-app-text-light">Joined</p>
                </div>
              </div>

              {/* Last Order */}
              <div className="mt-3 pt-3 border-t border-app-border/50 flex items-center gap-2 text-xs text-app-text-light">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>
                  Last order: {new Date(user.lastOrder).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex items-center justify-between px-6 py-4 mt-6 bg-white rounded-2xl shadow-sm"
        >
          <p className="text-sm text-app-text-light">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}{" "}
            users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-app-border hover:bg-app-cream disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-app-border hover:bg-app-cream disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Users;
