import './App.css'
import HeaderComponent from "./components/HeaderComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import SidebarComponent from "./components/SidebarComponent.jsx";


function App() {

  return (
      <>
      <BrowserRouter>
        <div className="flex">
            <SidebarComponent />
            <div className="flex-1 ml-64">
              <HeaderComponent/>
              <main className="p-8">

                  <Routes>
                    <Route path="*" element={<NotFoundPage />}/>
                    <Route path="/" element={ <HomePage /> }/>
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
