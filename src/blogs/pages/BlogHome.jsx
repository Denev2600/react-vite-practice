import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogItems from "./components/BlogItems";
import { Pagination } from "@mui/material";

export default function BlogHome() {
  const [blog, setBlog] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const [keyword, setKeyword] = useState("");

  const getBlogs = () => {
    axios
      .get(
        `http://localhost:8080/board/list?page=${
          page - 1
        }&size=${size}&searchKeyword=${keyword}`
      )
      .then((res) => {
        setBlog(res.data.content);
        setTotalPages(res.data.totalElements);
        setSize(res.data.size);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    getBlogs();
  }, [page]);

  return (
    <>
      <Link to="/blogs/create">
        <button>글 작성</button>
      </Link>
      <form>
        <input
          placeholder="검색어"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        ></input>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            getBlogs();
          }}
        >
          검색
        </button>
      </form>

      {blog.map((data, idx) => (
        <div key={idx}>
          <BlogItems blog={data} />
        </div>
      ))}
      <Pagination
        page={page}
        count={Math.ceil(totalPages / 10)}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
      />
    </>
  );
}
