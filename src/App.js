import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import extractingDataFromDou from "./extractingDataFromDou";

import "./App.scss";
import InfoBlock from "./components/info-block/InfoBlock.jsx";
import CompaniesBlock from "./components/companies-block/CompaniesBlock.jsx";

function App() {
  // const companies = ["softjourn", "tenantcloud", "eleks", "softserve", "epam"];
  const companies = [
    { name: "softserve", color: "#1f58f2" },
    { name: "softjourn", color: "#6554c0" },
    { name: "tenantcloud", color: "#3e9d3e" },
    { name: "eleks", color: "#0042e6" },
    { name: "epam", color: "#14293e" },
  ];

  const [vacancies, setVacansies] = useState({});
  const allVacanciesAsArray = Object.values(vacancies).flat();
  const vacanciesCount = allVacanciesAsArray.length;
  const vacanciesPerRole = {};

  useEffect(() => {
    companies.forEach(async (company) => {
      let res = await extractingDataFromDou(company.name);
      setVacansies((prevState) => {
        return {
          ...prevState,
          [company.name]: res,
        };
      });
    });
  }, []);

  const ff = (role) => {
    let countByRole = 0;
    allVacanciesAsArray.forEach((v) => {
      if (v.title.includes(role)) {
        return (vacanciesPerRole[role] = countByRole++ + 1);
      }
    });
  };

  ff("Junior");
  ff("Senior");
  ff("Middle");

  console.log(vacanciesPerRole);
  return (
    <div>
      <InfoBlock role="Senior" vacanciesCount={vacanciesPerRole.Senior} />
      <InfoBlock role="Middle" vacanciesCount={vacanciesPerRole.Middle} />
      <InfoBlock role="Junior" vacanciesCount={vacanciesPerRole.Junior} />
      <CompaniesBlock companies={companies} />
    </div>
  );
}
export default App;
