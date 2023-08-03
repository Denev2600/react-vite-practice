/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
export default function BlogComments({ comments, handleCommentRemove }) {
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
