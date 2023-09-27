/* eslint-disable react/prop-types */
import { Box, Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BlogComments({
  comments,
  handleCommentRemove,
  handleCommentEdit,
  handleCommentsUpdate,
}) {
  const [avatar, setAvatar] = useState("");
  const [commentUpdate, setCommentUpdate] = useState(true);

  const getAvatar = (id) => {
    axios
      .get(`http://localhost:8085/users/${id}`)
      .then((res) => {
        console.log(res);
        setAvatar(res.data.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = () => {
    setCommentUpdate(!commentUpdate);
    console.log(commentUpdate);
  };

  useEffect(() => {
    getAvatar(comments.author);
  }, [comments.author]);

  return (
    <>
      {commentUpdate ? (
        <Box
          sx={{
            backgroundColor: "lightblue",
            border: "2px solid green",
            borderRadius: "10px 10px 10px 10px / 10px 10px 10px 10px",
            padding: "0 1rem",
            margin: "10px",
          }}
        >
          <div>
            <Avatar alt={comments.author} src={avatar} />
            <b>{comments.author}</b> : {comments.content}{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCommentRemove(comments.id);
              }}
            >
              삭제
            </button>
            <button onClick={handleEdit}>수정</button>
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            border: "2px solid lightgreen",
            borderRadius: "10px 10px 10px 10px / 10px 10px 10px 10px",
            padding: "0 1rem",
            margin: "7px",
          }}
        >
          <div>
            <input
              type="text"
              onChange={handleCommentEdit}
              value={comments.content}
            />
            <button onClick={handleCommentsUpdate}>수정</button>
            <button onClick={setCommentUpdate(!commentUpdate)}>취소</button>
          </div>
        </Box>
      )}
    </>
  );
}
