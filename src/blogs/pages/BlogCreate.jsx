import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const navigate = useNavigate();

  const getCreatedAt = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setCreatedAt(`${year}-${month}-${day}`);
  };

  useEffect(() => {
    getCreatedAt();
  }, []);

  const addBlog = () => {
    axios
      .post("http://localhost:8080/board/writedo", {
        title,
        content,
      })
      .then((res) => {
        console.log(res);
        setTitle("");
        setContent("");
        setAuthor("");
        getCreatedAt();
        navigate("/blogs");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addFunction = (e) => {
    e.preventDefault();
    if (title === "" || content === "") {
      window.alert("빈 내용이 있습니다. 확인해주세요.");
    } else if (window.confirm("글을 게시하시겠습니까?") === false) {
      return;
    } else {
      setCreatedAt(new Date());
      addBlog();
      window.alert("게시되었습니다.");
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  return (
    <div className="add">
      <h2> 글 작성 </h2>
      <form>
        <input
          type="text"
          placeholder="title"
          onChange={handleTitle}
          value={title}
        />
        <br />
        <textarea
          placeholder="content"
          onChange={handleContent}
          value={content}
        />
        <br />
        {/* <input
          type="text"
          placeholder="author"
          onChange={handleAuthor}
          value={author}
        /> */}
        <br />
        <br />
        <button type="submit" onClick={addFunction}>
          글 게시
        </button>
        <button
          type="reset"
          onClick={() => {
            setTitle("");
            setContent("");
            setAuthor("");
            setCreatedAt("");
          }}
        >
          다시 작성
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/blogs");
          }}
        >
          취소
        </button>
      </form>
    </div>
  );
}
