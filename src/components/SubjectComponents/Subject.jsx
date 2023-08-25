import { ListItem, Typography, ListItemText, Link } from "@mui/material";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";
export default function Subject({ data }) {
  return (
    <Link component={LinkRouter} to={"/subjects/" + data.name} underline="none">
      <ListItem sx={{ bgcolor: "#eeeef0", mb: 1 }}>
        <ListItemText
          primary={data.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {data.name}
              </Typography>
              {/* content */}
              {" — " + data.finalExam.score}
            </React.Fragment>
          }
        />
      </ListItem>
    </Link>
  );
}
