import {
  AlertTriangleIcon,
  PackageIcon,
  ShoppingBagIcon,
  UsersIcon,
  EyeIcon,
  ChevronRightIcon,
  CalendarIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyAdminDashboardData } from "../../assets/data";
import Loading from "../../components/cards/Loading";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface Stats {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  outOfStock: number;
  recentOrders: any[];
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const cards = stats
    ? [
        {
          label: "Total Orders",
          value: stats.totalOrders,
          icon: ShoppingBagIcon,
          color: "blue",
        },
        {
          label: "Total Users",
          value: stats.totalUsers,
          icon: UsersIcon,
          color: "green",
        },
        {
          label: "Total Products",
          value: stats.totalProducts,
          icon: PackageIcon,
          color: "purple",
        },
        {
          label: "Out of Stock",
          value: stats.outOfStock,
          icon: AlertTriangleIcon,
          color: "red",
        },
      ]
    : [];

  useEffect(() => {
    const fetchDashboardData = () => {
      setLoading(true);
      setStats(dummyAdminDashboardData);
    };

    const timer = setTimeout(() => {
      fetchDashboardData();
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "processing":
        return "bg-yellow-500";
      case "shipped":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            purple: "bg-purple-50 text-purple-600",
            red: "bg-red-50 text-red-600",
          };

          return (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-app-text-light font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-app-text mt-1">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-app-border/50">
          <div>
            <h3 className="text-lg font-serif text-app-text">Recent Orders</h3>
            <p className="text-sm text-app-text-light">
              Latest orders from customers
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="flex items-center gap-1 text-sm text-app-orange hover:text-app-orange-dark transition-colors"
          >
            View All
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {stats?.recentOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-app-cream flex items-center justify-center mx-auto mb-4">
              <ShoppingBagIcon className="w-8 h-8 text-app-text-light/40" />
            </div>
            <p className="text-app-text-light">No recent orders</p>
          </div>
        ) : (
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
                    Status
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-app-text-light uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-app-border/50">
                {stats?.recentOrders.map((order, index) => (
                  <motion.tr
                    key={order.orderId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
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
                        ${order.totalAmount.toFixed(2)}
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
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/orders/${order.orderId}`}
                        className="inline-flex items-center gap-1 text-sm text-app-orange hover:text-app-orange-dark transition-colors"
                      >
                        <EyeIcon className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default Dashboard;
