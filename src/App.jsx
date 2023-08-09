import { BrowserRouter } from "react-router-dom";
import RoutesSetup from "./routesSetup/RoutesSetup";
import Header from "./common/Navigation/Header";
import BreadcrumbsNavigation from "./common/Navigation/BreadcrumbsNavigation";

function App() {
  return (
    <>
      <BrowserRouter>
        <BreadcrumbsNavigation />
        <Header />
        <RoutesSetup />
      </BrowserRouter>
    </>
  );
}

export default App;
