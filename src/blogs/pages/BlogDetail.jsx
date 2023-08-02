import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [update, setUpdate] = useState(true);
  const [createdAt, setCreatedAt] = useState("");
  const navigate = useNavigate();

  const getBlogs = (id) => {
    axios
      .get(`http://localhost:8085/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleEditor = () => {
    setTitle(blog.title);
    setContent(blog.content);
    setUpdate(!update);
  };

  const getCreatedAt = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setCreatedAt(`${year}-${month}-${day}`);
  };

  const handleRemove = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?") === false) {
      return;
    } else {
      axios
        .delete(`http://localhost:8085/blogs/${id}`)
        .then((res) => {
          console.log(res);
          navigate("/blogs");
          alert("삭제되었습니다.");
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
        getBlogs(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePost = (id) => {
    if (title === "" || content === "") {
      alert("제목이나 내용이 없습니다.");
      return;
    } else if (window.confirm("수정하시겠습니까?") === false) {
      return;
    }
    getCreatedAt();
    updateBlog(id, title, content, blog.author, createdAt);
    setUpdate(true);
    alert("수정되었습니다.");
  };

  useEffect(() => {
    getBlogs(id);
  }, [id]);

  return (
    <>
      {update ? (
        <Box
          sx={{
            backgroundColor: "lightblue",
            border: "2px solid lightskyblue",
            borderRadius: "10px 10px 10px 10px / 10px 10px 10px 10px",
            padding: "0 1rem",
          }}
        >
          <div className="detail">
            <h1>{blog.title}</h1>
            <h3>{blog.content}</h3>
            <p>작성자: {blog.author}</p>
            <p>게시 날짜: {blog.createdAt}</p>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemove(blog.id);
              }}
            >
              삭제
            </button>
            <button onClick={handleEditor}>수정</button>
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            border: "2px solid lightgreen",
            borderRadius: "10px 10px 10px 10px / 10px 10px 10px 10px",
            padding: "0 1rem",
          }}
        >
          <div>
            <h2> 글 수정 </h2>
            <form>
              <input type="text" onChange={handleTitle} value={title} />
              <br />
              <textarea onChange={handleContent} value={content} />
              <br />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  updatePost(id);
                }}
              >
                수정
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setTitle("");
                  setContent("");
                }}
              >
                재작성
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle(blog.title);
                  setContent(blog.content);
                  setUpdate(true);
                }}
              >
                취소
              </button>
            </form>
          </div>
        </Box>
      )}
    </>
  );
}
