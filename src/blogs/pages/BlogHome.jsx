import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogItems from "./components/BlogItems";

export default function BlogHome() {
  const [blog, setBlog] = useState([]);

  const getBlogs = () => {
    axios
      .get("http://localhost:8085/blogs")
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <Link to="/blogs/create">
        <button>글 작성</button>
      </Link>

      {blog.map((data,idx) => (
        <div key={idx}>
        <BlogItems
          blog={data}
        />
        </div>
      ))}
    </>
  );
}
