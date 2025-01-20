import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Parser from "html-react-parser";
import SalaryConverter from "../components/SalaryConverter.jsx";

const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profession, setProfession] = useState("Java разработчик");
  const [searchQuery, setSearchQuery] = useState(profession);
  const [perPage, setPerPage] = useState(10);
  const [pendingPerPage, setPendingPerPage] = useState(perPage);

  const fetchVacancies = async () => {
    try {
      setLoading(true);

      const today = dayjs().subtract(1, "day").format("YYYY-MM-DD");
      const response = await axios.get("https://api.hh.ru/vacancies", {
        params: {
          text: profession,
          per_page: perPage,
          date_from: `${today}T00:00:00`,
          order_by: "publication_time",
        },
      });

      const vacanciesData = response.data.items;

      const detailedVacancies = await Promise.all(
          vacanciesData.map(async (vacancy) => {
            try {
              const vacancyDetails = await axios.get(
                  `https://api.hh.ru/vacancies/${vacancy.id}`
              );

              const { description, key_skills } = vacancyDetails.data;
              return {
                id: vacancy.id,
                name: vacancy.name,
                description,
                keySkills: key_skills.map((skill) => skill.name).join(", "),
                employer: vacancy.employer?.name || "Не указано",
                salary: vacancy.salary
                    ? {
                      from: vacancy.salary.from || "?",
                      to: vacancy.salary.to || "?",
                      currency: vacancy.salary.currency || "RUR",
                    }
                    : null,
                area: vacancy.area?.name || "Не указано",
                publishedAt: vacancy.published_at,
              };
            } catch (error) {
              console.error(`Ошибка загрузки деталей вакансии: ${vacancy.id}`);
              return null;
            }
          })
      );

      setVacancies(detailedVacancies.filter(Boolean));
    } catch (error) {
      console.error("Ошибка загрузки вакансий", error);
      setError("Не удалось загрузить вакансии");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setProfession(searchQuery);
    setPerPage(pendingPerPage);
  };

  useEffect(() => {
    fetchVacancies();
  }, [profession, perPage]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div className="vacancies-page">
        <h1 className="text-xl font-bold mb-4">Последние вакансии</h1>

        <div className="mb-6 flex align-baseline md:items-center gap-4 flex-wrap flex-col md:flex-row">
          <label htmlFor="profession" className="mr-2">
            Поле поиска:
          </label>
          <input
              id="profession"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded p-2 w-64"
              placeholder="Введите данные для поиска..."
          />
          <label htmlFor="perPage" className="mr-2">
            Кол-во вакансий на страницу:
          </label>
          <input
              id="perPage"
              type="number"
              value={pendingPerPage}
              onChange={(e) =>
                  setPendingPerPage(Math.max(1, parseInt(e.target.value, 10) || 1))
              }
              className="border rounded p-2 w-16"
          />
          <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Найти
          </button>
        </div>

        <ul className="vacancy-list space-y-4">
          {vacancies.map((vacancy) => (
              <li key={vacancy.id} className="border p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">{vacancy.name}</h2>
                <p>
                  <strong>Описание:</strong> {Parser(vacancy.description) || "Не указано"}
                </p>
                <p>
                  <strong>Навыки:</strong> {vacancy.keySkills || "Не указаны"}
                </p>
                <p>
                  <strong>Компания:</strong> {vacancy.employer}
                </p>
                <p>
                  <strong>Оклад:</strong>
                  {vacancy.salary ? (
                      <SalaryConverter
                          salaryData={{
                            salaryFrom: vacancy.salary.from || "?",
                            salaryTo: vacancy.salary.to || "?",
                            currencyCode: vacancy.salary.currency || "RUR",
                          }}
                      />
                  ) : (
                      " Не указано"
                  )}
                </p>
                <p>
                  <strong>Регион:</strong> {vacancy.area}
                </p>
                <p>
                  <strong>Дата публикации:</strong>{" "}
                  {dayjs(vacancy.publishedAt).format("DD.MM.YYYY HH:mm")}
                </p>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default VacanciesPage;
