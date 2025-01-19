import React, { useState, useEffect } from "react";

const SalaryConverter = ({ salaryData }) => {
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedSalary, setConvertedSalary] = useState(null);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
        const data = await response.json();
        setConversionRate(data.Valute);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExchangeRate();
  }, []);

  useEffect(() => {
    if (salaryData && conversionRate) {
      const { salaryFrom, salaryTo, currencyCode } = salaryData;

      if (!salaryFrom || !salaryTo || !currencyCode) {
        setConvertedSalary("Не указано");
        return;
      }

      setCurrency(currencyCode);

      if (currencyCode === "RUR") {
        setConvertedSalary(`${salaryFrom} - ${salaryTo}`);
      } else if (conversionRate[currencyCode]) {
        const rate = conversionRate[currencyCode].Value;
        const convertedFrom = (salaryFrom * rate).toFixed(2);
        const convertedTo = (salaryTo * rate).toFixed(2);

        setConvertedSalary(`${salaryFrom} - ${salaryTo} ${currencyCode} (${convertedFrom} - ${convertedTo} RUR)`);
      } else {
        setConvertedSalary(`${salaryFrom} - ${salaryTo} ${currencyCode}`);
      }
    }
  }, [salaryData, conversionRate]);

  if (!salaryData) {
    return <div>Не указано</div>;
  }

  return (
    <div>
      <p>{convertedSalary}</p>
    </div>
  );
};

export default SalaryConverter;
