"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "dotenv/config";

import ItemDetail from "./item-detail";
import { Box } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const backendURL = process.env.NEXT_PUBLIC_URL_BACKEND;

export default function ItemsID({ params }: { params: { id: string } }) {
  const itemId = params.id;
  const [itemState, setItemState] = useState({});
  const [itemLoadedState, setItemSLoadedState] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${backendURL}/api/items/${itemId}`)
      .then((data) => {
        setItemState(data.data.item);
      })
      .catch(function (error) {
        setItemState({});
        setError(error);
        console.error(error);
      });
  }, [itemId]);

  useEffect(() => {
    setItemSLoadedState(true);
  }, [itemState]);

  if (error) return <>Error: error</>;
  else if (itemLoadedState) return <ItemDetail itemState={itemState} />;
  else
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
