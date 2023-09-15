import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogComments from "./components/BlogComments";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [update, setUpdate] = useState(true);
  const [createdAt, setCreatedAt] = useState("");
  const [comments, setComments] = useState([]);
  const [cmcontent, setCmcontent] = useState("");
  const navigate = useNavigate();

  const getBlogs = (id) => {
    axios
      .get(`http://localhost:8080/board/view/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getComments = (id) => {
    axios
      .get(`http://localhost:8080/board/view/${id}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(comments);

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

  const handleComments = (e) => {
    setCmcontent(e.target.value);
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
        .delete(`http://localhost:8080/board/delete/${id}`)
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

  const handleCommentRemove = (cid) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    axios
      .delete(`http://localhost:8080/board/view/comments/delete/${cid}`)
      .then((res) => {
        console.log(res);
        getComments(id);
        alert("댓글이 삭제되었습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCommentsAdd = () => {
    if (!window.confirm("댓글을 등록하시겠습니까?")) return;

    axios
      .post(`http://localhost:8080/board/view/${id}/comments`, {
        content: cmcontent,
        author: "guest",
        postId: parseInt(id),
      })
      .then((res) => {
        console.log(res);
        getBlogs(id);
        getComments(id);
        setCmcontent("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateBlog = (id, title, content) => {
    axios
      .put(`http://localhost:8080/board/update/${id}`, {
        title,
        content,
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
    getComments(id);
  }, [id]);

  return (
    <>
      {update ? (
        <div>
          <Box
            sx={{
              backgroundColor: "lightskyblue",
              border: "2px solid blue",
              borderRadius: "10px 10px 10px 10px / 10px 10px 10px 10px",
              padding: "0 1rem",
              margin: "7px",
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
              <br />
              <br />
              guest :{" "}
              <input type="text" onChange={handleComments} value={cmcontent} />
              <button onClick={handleCommentsAdd}>등록</button>
              <button
                onClick={() => {
                  setCmcontent("");
                }}
              >
                취소
              </button>
            </div>
          </Box>
          {comments && (
            <div>
              {comments.map((data) => (
                <div key={data.id}>
                  <BlogComments
                    comments={data}
                    handleCommentRemove={handleCommentRemove}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <Box
            sx={{
              border: "2px solid lightgreen",
              borderRadius: "10px 10px 10px 10px / 10px 10px 10px 10px",
              padding: "0 1rem",
              margin: "7px",
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
        </>
      )}
    </>
  );
}
