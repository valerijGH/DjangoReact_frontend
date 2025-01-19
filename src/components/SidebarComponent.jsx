import { Link, useLocation } from "react-router-dom";

const SidebarComponent = () => {
  const location = useLocation();
  const navItems = [
    { label: "Главная страница", path: "/" },
    { label: "Общая статистика", path: "/statistics" },
    { label: "Востребованность", path: "/demand" },
    { label: "География", path: "/geography" },
    { label: "Навыки", path: "/skills" },
    { label: "Последние вакансии", path: "/vacancies" },
  ];

  return (
    <nav className="bg-black text-white h-screen w-64 fixed top-0 left-0 py-6 px-4">
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
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
  );
};

export default SidebarComponent;
