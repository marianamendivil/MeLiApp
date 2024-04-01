"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import "dotenv/config";

import Results from "./results";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Paper } from "@mui/material";
import "./page.scss";

const backendURL = process.env.NEXT_PUBLIC_URL_BACKEND;

export default function Items() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const [resultsState, setResultsState] = useState([]);
  const [resultsLoadedState, setResultsLoadedState] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${backendURL}/api/items?`, {
        params: {
          q: search,
        },
      })
      .then((data) => {
        console.log(data);
        setResultsState(data.data.items);
      })
      .catch(function (error) {
        setResultsState([]);
        setError(error);
        console.error(error);
      });
  }, [search]);

  useEffect(() => {
    setResultsLoadedState(true);
  }, [resultsState]);

  if (error) return <>Error: error</>;
  else if (resultsLoadedState) {
    return (
      <Box
        className="page-box"
        sx={{
          display: "flex",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: "100%",
          },
        }}
      >
        <Paper elevation={0}>
          {resultsState.map((product: any) => (
            <Results key={product.id} product={product} />
          ))}
        </Paper>
      </Box>
    );
  } else {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RestartAltIcon
            color="primary"
            sx={{ display: "flex", fontSize: 100, justifyContent: "center" }}
          />
        </Box>
      </>
    );
  }
}
