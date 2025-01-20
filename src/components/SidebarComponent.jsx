import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const SidebarComponent = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Главная страница", path: "/" },
    { label: "Общая статистика", path: "/statistics" },
    { label: "Востребованность", path: "/demand" },
    { label: "География", path: "/geography" },
    { label: "Навыки", path: "/skills" },
    { label: "Последние вакансии", path: "/vacancies" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-2 right-4 md:left-4 z-50 bg-black text-white p-3 rounded-md shadow-md"
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      ></div>

      <nav
        className={`bg-black text-white h-screen w-64 fixed left-0  right-0 py-6 px-4 transition-transform transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-4 sm:pt-14 md:p-0">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center px-4 py-3 rounded-md transition-all ${
                  location.pathname === item.path
                    ? "text-white bg-gray-700"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default SidebarComponent;
