import { BrowserRouter } from "react-router-dom";
import RoutesSetup from "./routesSetup/RoutesSetup";
import Header from "./common/Navigation/Header";
import BreadcrumbsNavigation from "./common/Navigation/BreadcrumbsNavigation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <BreadcrumbsNavigation />
          <RoutesSetup />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
