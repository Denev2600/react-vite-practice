import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogItems from "./components/BlogItems";
import { Pagination } from "@mui/material";

export default function BlogHome() {
  const [blog, setBlog] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const getBlogs = () => {
    axios
      .get(`http://localhost:8085/blogs?_page=${page}&_limit=3`)
      .then((res) => {
        setBlog(res.data);
        setTotalPages(res.headers["x-total-count"]);
        console.log(totalPages);
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

      {blog.map((data, idx) => (
        <div key={idx}>
          <BlogItems blog={data} />
        </div>
      ))}
      <Pagination
        page={page}
        count={Math.ceil(totalPages / 4)}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
      />
    </>
  );
}
