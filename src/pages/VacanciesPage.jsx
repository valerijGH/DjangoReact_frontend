import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Parser from "html-react-parser";
import SalaryConverter from "../components/SalaryConverter.jsx";

const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profession, setProfession] = useState("Java разработчик");
  const [searchQuery, setSearchQuery] = useState(profession);

  const fetchVacancies = async () => {
    try {
      setLoading(true);

      const today = dayjs().subtract(1, "day").format("YYYY-MM-DD");
      const response = await axios.get("https://api.hh.ru/vacancies", {
        params: {
          text: profession,
          per_page: 10,
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

  useEffect(() => {
    fetchVacancies();
  }, [profession]);

  const handleSearch = () => {
    setProfession(searchQuery);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="vacancies-page">
      <h1 className="text-xl font-bold mb-4">Последние вакансии</h1>

      {/* Поисковая форма */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 w-64"
          placeholder="Введите профессию..."
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
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
