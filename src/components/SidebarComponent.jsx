// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { checkAuth } from "./slices/auth/authSlice.js";
import { Link, useLocation } from "react-router-dom";

const SidebarComponent = () => {
  // const { isAuthorized } = useSelector((state) => state.auth);
  // const user = localStorage.getItem("user");
  // const dispatch = useDispatch();
  const location = useLocation(); // Получаем текущий путь
  //
  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, [dispatch]);

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
      <div className="flex flex-col items-center">
        {/*<div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold text-2xl">*/}
        {/*  S*/}
        {/*</div>*/}
        {/*<p className="mt-4 text-sm">{!isAuthorized ? "Гость" : user}</p>*/}
      </div>
      <hr className="my-6 border-gray-600" />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5 mr-3"
                viewBox="0 0 512 512"
              >
                {/* SVG иконки можно добавить здесь */}
              </svg>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarComponent;
