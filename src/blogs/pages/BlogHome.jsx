import axios from "axios";
import { useEffect, useState } from "react";

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

  console.log(blog);
  return (
    <>
      {blog.map((data) => {
        return (
          <div key={data.id}>
            <h1>{data.title}</h1>
            <h3>{data.content}</h3>
            <p>{data.author}</p>
            <p>{data.createdAt}</p>
          </div>
        );
      })}
    </>
  );
}
