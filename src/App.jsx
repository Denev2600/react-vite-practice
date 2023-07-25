import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import BlogHome from "./blogs/pages/BlogHome";
import MyPage from "./users/pages/MyPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogHome />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
