/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function BlogItems({ blog }) {
  return (
    <>
      <Link to={`/blogs/${blog.id}`} style={{ textDecoration: "none" }}>
        <Box
          sx={{
            backgroundColor: "skyblue",
            border: "2px solid blue",
            borderRadius: "10px 10px 10px 10px / 10px 10px 10px 10px",
            padding: "0 1rem",
            margin: "7px",
          }}
          key={blog.id}
        >
          <div>
            <p>
              <b>{blog.id}</b> : {blog.title}
            </p>
          </div>
        </Box>
      </Link>
    </>
  );
}
