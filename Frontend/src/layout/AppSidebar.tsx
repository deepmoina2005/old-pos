import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  Boxes,
  ChartColumnIncreasing,
  ChevronDown,
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  StoreIcon,
} from "lucide-react";

// Assume these icons are imported from an icon library
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  { icon: <LayoutDashboard />, name: "Dashboard", path: "/dashboard" },

  {
    icon: <ChartColumnIncreasing />,
    name: "Sales",
    subItems: [
      { name: "New Sales", path: "/new-sales" },
      { name: "Sales History", path: "/sales-history" },
    ],
  },
  {
    icon: <ShoppingCart />,
    name: "Products",
    subItems: [
      { name: "Add Product", path: "/add-product" },
      { name: "All Product", path: "/all-products" },
    ],
  },
  {
    icon: <ShoppingBag />,
    name: "Purchase",
    subItems: [
      { name: "Purchase Product", path: "/add-purchase" },
      { name: "All Purchase", path: "/all-purchase" },
    ],
  },
  {
    icon: <StoreIcon />,
    name: "Supliers",
    subItems: [
      { name: "Add Supliers", path: "/add-supliers" },
      { name: "All Supliers", path: "/all-supliers" },
    ],
  },
  {
    icon: <Boxes />,
    name: "Categories",
    subItems: [
      { name: "Add Category", path: "/add-category" },
      { name: "All Categories", path: "/all-categories" },
    ],
  },
  {
    icon: <Package />,
    name: "Units",
    subItems: [
      { name: "Add Unit", path: "/add-unit" },
      { name: "All Units", path: "/all-units" },
    ],
  },
  { icon: <Settings />, name: "Settings", path: "/settings" },
  { icon: <CircleUserRound />, name: "Profile", path: "/profile" },
  { icon: <LogOut />, name: "Logout", path: "/" },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu(index);
            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      if (subMenuRefs.current[`${openSubmenu}`]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [`${openSubmenu}`]:
            subMenuRefs.current[`${openSubmenu}`]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex gap-4 justify-between items-center">
              <img
                src="/images/logo/logo-icon.svg"
                alt="Logo"
                width={40}
                height={40}
              />
              <span className="text-black dark:text-white font-bold text-lg">
                GROCERY-STORE
              </span>
            </div>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          {/* Removed "School Management" title block completely */}

          <ul className="flex flex-col gap-4 mt-2">
            {navItems.map((nav, index) => (
              <li key={nav.name}>
                {nav.subItems ? (
                  <button
                    onClick={() => handleSubmenuToggle(index)}
                    className={`menu-item group ${
                      openSubmenu === index
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    } cursor-pointer ${
                      !isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "lg:justify-start"
                    }`}
                  >
                    <span
                      className={`menu-item-icon-size ${
                        openSubmenu === index
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    >
                      {nav.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text">{nav.name}</span>
                    )}
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <ChevronDown
                        className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                          openSubmenu === index
                            ? "rotate-180 text-brand-500"
                            : ""
                        }`}
                      />
                    )}
                  </button>
                ) : (
                  nav.path && (
                    <Link
                      to={nav.path}
                      className={`menu-item group ${
                        isActive(nav.path)
                          ? "menu-item-active"
                          : "menu-item-inactive"
                      }`}
                    >
                      <span
                        className={`menu-item-icon-size ${
                          isActive(nav.path)
                            ? "menu-item-icon-active"
                            : "menu-item-icon-inactive"
                        }`}
                      >
                        {nav.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="menu-item-text">{nav.name}</span>
                      )}
                    </Link>
                  )
                )}
                {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                  <div
                    ref={(el) => {
                      subMenuRefs.current[`${index}`] = el;
                    }}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      height:
                        openSubmenu === index
                          ? `${subMenuHeight[`${index}`]}px`
                          : "0px",
                    }}
                  >
                    <ul className="mt-2 space-y-1 ml-9">
                      {nav.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.path}
                            className={`menu-dropdown-item ${
                              isActive(subItem.path)
                                ? "menu-dropdown-item-active"
                                : "menu-dropdown-item-inactive"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;