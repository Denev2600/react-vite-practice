import { BrowserRouter } from "react-router-dom";
import RoutesSetup from "./routesSetup/RoutesSetup";
import Header from "./common/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <RoutesSetup />
      </BrowserRouter>
    </>
  );
}

export default App;
