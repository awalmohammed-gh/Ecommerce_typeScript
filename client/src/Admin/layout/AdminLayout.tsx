import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { motion } from "framer-motion";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-app-cream">
      <AdminSidebar />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="lg:ml-70 min-h-screen transition-all duration-300"
      >
        {/* Top Bar */}
        <div className="bg-white border-b border-app-border/50 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-serif text-app-text">Admin Panel</h1>
              <p className="text-sm text-app-text-light">Manage your store</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Admin Badge */}
              <span className="px-3 py-1 bg-app-orange/10 text-app-orange text-xs font-medium rounded-full">
                Admin
              </span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 md:p-8">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default AdminLayout;
