import {
  MenuIcon,
  SearchIcon,
  UserIcon,
  X,
  ShoppingBagIcon,
  LogOutIcon,
  UserCircle2Icon,
  PackageIcon,
  HeartIcon,
  MapPinIcon,
  SettingsIcon,
  ChevronDownIcon,
  LogInIcon,
  UserPlusIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContextProvider";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [openUser, setOpenUser] = useState(false);
  const [onMobile, setOnMobile] = useState(false);

  const { user } = {
    user: {
      firstName: "Mohammed",
      lastName: "Awal",
      email: "mohammed0012@gmail.com",
    },
  };

  const { cartCount, setIsCartOpen, isLogin, setCurrentState, setIsLogin, wishlist } = useShop();
  const navigate = useNavigate()

  const navLinks = [
    { id: 1, name: "Shop", path: "/products" },
    {
      id: 3,
      name: "Category",
      icon: ChevronDownIcon,
      children: [
        { id: 4, name: "Men", path: "/categories?category=men" },
        { id: 5, name: "Women", path: "/categories?category=women" },
        { id: 5, name: "Kids", path: "/categories?category=kids" },
        {
          id: 6,
          name: "Accessories",
          path: "/categories?category=accessories",
        },
      ],
    },
    { id: 7, name: "Journal", path: "/journal" },
    { id: 8, name: "About", path: "/about" },
  ];

  const accountLinks = [
    { id: 1, name: "My Profile", path: "/profile", icon: UserCircle2Icon },
    { id: 2, name: "Orders", path: "/order", icon: PackageIcon },
    { id: 3, name: "Wishlist", path: "/wishlist", icon: HeartIcon },
    { id: 4, name: "Addresses", path: "/my-addresses", icon: MapPinIcon },
    { id: 5, name: "Settings", path: "/settings", icon: SettingsIcon },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-app-border/40">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-8 lg:gap-12">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-2xl font-bold text-app-green shrink-0 tracking-tight"
          >
            Village<span className="text-app-orange">Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                {link.children ? (
                  <>
                    <button className="flex items-center gap-1.5 text-sm font-medium text-app-text/80 hover:text-app-orange transition-colors py-2 group">
                      {link.name}
                      {link.icon && (
                        <link.icon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-xl shadow-xl min-w-44 py-2 border border-app-border/50 backdrop-blur-sm">
                        {link.children.map((child) => (
                          <NavLink
                            key={child.id}
                            to={child.path}
                            className={({ isActive }) =>
                              `block px-5 py-2.5 text-sm ${
                                isActive
                                  ? "text-app-orange bg-orange-50/80"
                                  : "text-app-text/70 hover:text-app-text hover:bg-app-cream/60"
                              } transition-colors`
                            }
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={() => window.scrollTo({top:0, behavior:"smooth"})}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors relative ${
                        isActive
                          ? "text-app-orange"
                          : "text-app-text/80 hover:text-app-orange"
                      }`
                    }
                  >
                    {link.name}
                    {({ isActive }) =>
                      isActive && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-app-orange rounded-full" />
                      )
                    }
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <form className="hidden md:flex items-center flex-1 max-w-md mx-4 lg:mx-6">
            <div className="relative w-full">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light/60" />
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search for products..."
                value={search}
                className="w-full pl-10 pr-4 py-2.5 bg-app-cream/70 border border-app-border/50 rounded-full text-sm focus:border-app-orange/50 focus:ring-2 focus:ring-orange-100/60 transition-all placeholder:text-app-text-light/50"
              />
            </div>
          </form>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* User Account */}
            <div className="hidden md:relative md:block">
              <button
                onClick={() => setOpenUser((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-app-cream/60 transition-all duration-200"
              >
                {isLogin && (
                  <span className="text-sm font-medium text-app-text/80 hidden lg:inline">
                    {user.firstName}
                  </span>
                )}
                <div className="w-8 h-8 rounded-full bg-app-green/10 text-app-green flex-center">
                  <UserIcon className="w-4 h-4" />
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 text-app-text-light/60 transition-transform duration-200 ${
                    openUser ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openUser && (
                <div className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-md rounded-xl shadow-xl py-2 border border-app-border/50 animate-fade-in">
                  {isLogin ? (
                    <>
                      <div className="px-4 py-3 border-b border-app-border/30">
                        <p className="font-medium text-app-text">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-app-text-light/70 truncate">
                          {user.email}
                        </p>
                      </div>
                      {accountLinks.map((account) => {
                        const Icon = account.icon;
                        return (
                          <Link
                            key={account.id}
                            to={account.path}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-text/70 hover:text-app-text hover:bg-app-cream/60 transition-colors"
                            onClick={() => setOpenUser(false)}
                          >
                            <Icon className="w-4 h-4 text-app-text-light/60" />
                            {account.name}
                          </Link>
                        );
                      })}
                      <div className="border-t border-app-border/30 pt-2 mt-1">
                        <button
                          onClick={() => {
                            setIsLogin(false);
                            navigate("/");
                          }}
                          className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50/60 transition-colors"
                        >
                          <LogOutIcon className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 space-y-2">
                      <div className="px-2 py-1 text-xs font-medium text-app-text-light/60 uppercase tracking-wider">
                        Account Access
                      </div>
                      <button
                        onClick={() => {
                          setOpenUser(false);
                          setCurrentState("login");
                          navigate("/login");
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-text/70 hover:text-app-text hover:bg-app-cream/60 rounded-lg transition-colors"
                      >
                        <LogInIcon className="w-4 h-4 text-app-text-light/60" />
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          setOpenUser(false);
                          setCurrentState("login");
                          navigate("/login");
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-orange hover:text-app-orange-dark hover:bg-orange-50/60 rounded-lg transition-colors"
                      >
                        <UserPlusIcon className="w-4 h-4" />
                        Create Account
                      </button>
                      <div className="px-4 pt-2 mt-1 border-t border-app-border/30">
                        <p className="text-xs text-app-text-light/50 text-center">
                          New customer? Start here
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* wishlist Icon */}
            <button
              onClick={() => {navigate("/wishlist"); window.scrollTo({top:0, behavior:"smooth"})}}
              className="relative p-2.5 hover:bg-app-cream/60 rounded-full transition-all duration-200"
            >
              <HeartIcon className="w-5 h-5 text-app-text/80" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-app-orange text-white text-xs font-bold rounded-full flex-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* cart icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 hover:bg-app-cream/60 rounded-full transition-all duration-200"
            >
              <ShoppingBagIcon className="w-5 h-5 text-app-text/80" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-app-orange text-white text-xs font-bold rounded-full flex-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOnMobile((prev) => !prev)}
              className="lg:hidden p-2.5 hover:bg-app-cream/60 rounded-full transition-colors"
            >
              {onMobile ? (
                <X className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {onMobile && (
          <div className="lg:hidden border-t border-app-border/30 animate-slide-in-up">
            <div className="py-4 space-y-5">
              {/* Mobile Search */}
              <form>
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-light/60" />
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search for products..."
                    value={search}
                    className="w-full pl-10 pr-4 py-2.5 bg-app-cream/70 border border-app-border/50 rounded-xl text-sm focus:border-app-orange/50 focus:ring-2 focus:ring-orange-100/60 transition-all placeholder:text-app-text-light/50"
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <div key={link.id}>
                    {link.children ? (
                      <>
                        <div className="flex items-center gap-2 font-medium text-app-text/80 px-3 py-2.5">
                          {link.name}
                        </div>
                        <div className="pl-5 space-y-0.5">
                          {link.children.map((child) => (
                            <NavLink
                              key={child.id}
                              to={child.path}
                              onClick={() => setOnMobile(false)}
                              className={({ isActive }) =>
                                `block px-4 py-2.5 text-sm rounded-xl ${
                                  isActive
                                    ? "text-app-orange bg-orange-50/80"
                                    : "text-app-text-light/70 hover:text-app-text hover:bg-app-cream/60"
                                } transition-colors`
                              }
                            >
                              {child.name}
                            </NavLink>
                          ))}
                        </div>
                      </>
                    ) : (
                      <NavLink
                        to={link.path}
                        onClick={() => setOnMobile(false)}
                        className={({ isActive }) =>
                          `block px-4 py-2.5 rounded-xl font-medium ${
                            isActive
                              ? "text-app-orange bg-orange-50/80"
                              : "text-app-text/80 hover:text-app-orange hover:bg-app-cream/60"
                          } transition-colors`
                        }
                      >
                        {link.name}
                      </NavLink>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Account Section */}
              <div className="pt-5 border-t border-app-border/30">
                {isLogin ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2.5">
                      <div className="w-10 h-10 rounded-full bg-app-green/10 text-app-green flex-center">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-app-text">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-app-text-light/70">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-0.5 mt-2">
                      {accountLinks.map((account) => {
                        const Icon = account.icon;
                        return (
                          <Link
                            key={account.id}
                            to={account.path}
                            onClick={() => setOnMobile(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-text-light/70 hover:text-app-text hover:bg-app-cream/60 rounded-xl transition-colors"
                          >
                            <Icon className="w-4 h-4 text-app-text-light/60" />
                            {account.name}
                          </Link>
                        );
                      })}
                      <button className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50/60 rounded-xl transition-colors">
                        <LogOutIcon className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 px-3">
                    <p className="text-sm text-app-text/60 text-center">
                      Sign in to access your account
                    </p>
                    <Link
                      to="/login"
                      onClick={() => setOnMobile(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-app-orange text-white font-medium rounded-xl hover:bg-app-orange-dark transition-colors"
                    >
                      <LogInIcon className="w-4 h-4" />
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setOnMobile(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-app-border/50 text-app-text/70 font-medium rounded-xl hover:bg-app-cream/60 transition-colors"
                    >
                      <UserPlusIcon className="w-4 h-4" />
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
