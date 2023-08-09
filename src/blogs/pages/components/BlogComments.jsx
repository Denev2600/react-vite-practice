/* eslint-disable react/prop-types */
import { Box, Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BlogComments({ comments, handleCommentRemove }) {
  const [avatar, setAvatar] = useState("");

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

  useEffect(() => {
    getAvatar(comments.author);
  }, [comments.author]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "lightblue",
          border: "2px solid green",
          borderRadius: "10px 10px 10px 10px / 10px 10px 10px 10px",
          padding: "0 1rem",
          margin: "10px",
        }}
      >
        <p>
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
        </p>
      </Box>
    </>
  );
}
