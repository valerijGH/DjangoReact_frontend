import './App.css'
import HeaderComponent from "./components/HeaderComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import SidebarComponent from "./components/SidebarComponent.jsx";
import VacanciesPage from "./pages/VacanciesPage.jsx";
import GeneralStatisticsPage from "./pages/GeneralStatisticsPage.jsx";
import DemandPage from "./pages/DemandPage.jsx";
import GeographyPage from "./pages/GeographyPage.jsx";
import SkillPage from "./pages/SkillPage.jsx";


function App() {

  return (
      <>
      <BrowserRouter>
        <div className="flex">
            <SidebarComponent />
            <div className="flex-1 md:ml-64">
              <HeaderComponent/>
              <main className="p-8 min-h-screen">

                  <Routes>
                    <Route path="*" element={<NotFoundPage />}/>
                    <Route path="/" element={ <HomePage /> }/>
                    <Route path="/vacancies" element={ <VacanciesPage /> }/>
                    <Route path="/statistics" element={ <GeneralStatisticsPage /> }/>
                    <Route path="/demand" element={ <DemandPage /> }/>
                    <Route path="/geography" element={ <GeographyPage /> }/>
                    <Route path="/skills" element={ <SkillPage /> }/>
                  </Routes>

              </main>
              <FooterComponent />
            </div>
          </div>
        </BrowserRouter>
      </>
  )
}

export default App
