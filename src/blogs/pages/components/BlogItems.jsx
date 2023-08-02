/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function BlogItems({ blog }) {
  
  return (
    <>
    <Link to={`/blogs/${blog.id}`}>
    <Box
          sx={{
            backgroundColor: "lightblue",
            border: "2px solid lightskyblue",
            borderRadius: "10px 10px 10px 10px / 10px 10px 10px 10px",
            padding: "0 1rem",
          }}
          key={blog.id}
        >
          {blog.title}
        </Box>
    </Link>
    </>
  );
}
