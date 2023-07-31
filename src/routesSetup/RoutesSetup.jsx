import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import BlogHome from "../blogs/pages/BlogHome";
import MyPage from "../users/pages/MyPage";
import BlogCreate from "../blogs/pages/BlogCreate";

export default function RoutesSetup() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogHome />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/blog/create" element={<BlogCreate />} />
      </Routes>
    </>
  );
}
