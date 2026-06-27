import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboardIcon,
  PlusCircleIcon,
  PackageIcon,
  ShoppingBagIcon,
  UsersIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Product", path: "add-product", icon: PlusCircleIcon },
    { name: "List Product", path: "list-product", icon: PackageIcon },
    { name: "Orders", path: "orders", icon: ShoppingBagIcon },
    { name: "Users", path: "users-list", icon: UsersIcon },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.includes(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const sidebarVariants = {
    expanded: { width: "280px" },
    collapsed: { width: "80px" },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-app-green text-white rounded-xl shadow-lg hover:bg-app-green-light transition-colors"
      >
        {isMobileOpen ? (
          <XIcon className="w-5 h-5" />
        ) : (
          <MenuIcon className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial="expanded"
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed left-0 top-0 h-full bg-app-green shadow-2xl z-50
          flex flex-col overflow-hidden
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between px-4 h-20 border-b border-white/10 shrink-0"
        >
          <Link to="/admin" className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 rounded-xl bg-app-orange flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">VS</span>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="text-white font-bold text-xl whitespace-nowrap"
            >
              VillageStore
            </motion.span>
          </Link>

          {/* Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-5 h-5 text-white/70" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-white/70" />
            )}
          </motion.button>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const active = isActive(link.path);

            return (
              <motion.div
                key={link.path}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                    ${
                      active
                        ? "bg-app-orange text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="shrink-0"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className={`text-sm font-medium whitespace-nowrap ${
                      isCollapsed ? "hidden" : ""
                    }`}
                  >
                    {link.name}
                  </motion.span>
                  {active && !isCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-6 bg-white rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="border-t border-white/10 p-4 space-y-2 shrink-0"
        >
          {/* Admin Info */}
          <motion.div
            className={`flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-app-orange/30 flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-sm">A</span>
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-white font-medium text-sm">Admin</p>
                <p className="text-white/50 text-xs">Super Admin</p>
              </motion.div>
            )}
          </motion.div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={`
              flex items-center gap-3 px-3 py-2.5 w-full rounded-xl
              text-red-400 hover:text-red-300 hover:bg-red-500/10
              transition-all duration-200
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <LogOutIcon className="w-5 h-5 shrink-0" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </motion.button>
        </motion.div>
      </motion.aside>

      {/* Main Content Spacer */}
      <div
        className={`hidden lg:block transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-70"
        }`}
      />
    </>
  );
};

export default AdminSidebar;
