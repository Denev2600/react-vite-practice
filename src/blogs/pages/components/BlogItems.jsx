import { Box } from "@mui/material";
import { useState } from "react";

export default function BlogItems({ blog, handleRemove, updateBlog }) {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [update, setUpdate] = useState(true);
  const [createdAt, setCreatedAt] = useState(blog.createdAt);

  const getCreatedAt = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setCreatedAt(`${year}-${month}-${day}`);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.vlaue);
  };

  const handleEditor = () => {
    setUpdate(!update);
  };

  const updatePost = () => {
    if (title === "" || content === "") {
      alert("제목이나 내용이 없습니다.");
      return;
    }
    updateBlog(blog.id, title, content, blog.author, createdAt);
    setUpdate(true);
  };

  const updateFunction = (e) => {
    e.preventDefault();
    if (window.confirm("수정하시겠습니까?") === false) {
      return;
    }
    getCreatedAt();
    updatePost();
  };

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
              <button type="submit" onClick={updateFunction}>
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
