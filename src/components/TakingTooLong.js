import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { Box } from "@mui/material";

const TakingTooLong = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShow(true);
    }, 7000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box>
      {show && (
        <Alert severity="info">
          Sorry, this is taking too long. Try refreshing the page.
        </Alert>
      )}
    </Box>
  );
};

export default TakingTooLong;
