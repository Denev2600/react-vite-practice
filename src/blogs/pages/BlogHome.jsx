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

  const handleRemove = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?") === false) {
      return;
    } else {
      axios
        .delete(`http://localhost:8085/blogs/${id}`)
        .then((res) => {
          console.log(res);
          getBlogs();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const updateBlog = (id, title, content, author, createdAt) => {
    axios
      .put(`http://localhost:8085/blogs/${id}`, {
        title,
        content,
        author,
        createdAt,
      })
      .then((res) => {
        console.log(res);
        getBlogs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  console.log(blog);

  return (
    <>
      <Link to="/blogCreate">
        <button>글 작성</button>
      </Link>

      {blog.map((data) => (
        <BlogItems
          key={data.id}
          blog={data}
          handleRemove={handleRemove}
          updateBlog={updateBlog}
        />
      ))}
    </>
  );
}
