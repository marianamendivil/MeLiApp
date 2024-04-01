import express from "express";
import fetch from "node-fetch";
import "dotenv/config";

import {
  getTransformedItemsAndCategories,
  getTransformedItem,
} from "./helpers.js";

const app = express();
const PORT = process.env.PORT;

import cors from "cors";
const corsOption = {
  origin: [process.env.URL_CORS],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOption));

app.use(express.json());

app.get("/api/items", async (req, res, next) => {
  const query = req.query.q;
  console.log("/api/items - ", query);
  const data = await fetch(
    `${process.env.URL_MELI}/sites/MLA/search?limit=4&q=${query}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .catch((error) => {
      res.status(error.status).send(`${error.statusText} not found`);
      next(error.statusText);
      return;
    });

  if (!data) {
    return;
  }

  const transformedItemsAndCategories = getTransformedItemsAndCategories(
    data,
    ""
  );
  const transformedData = {
    author: {
      name: "Mariana",
      lastname: "Mendivil",
    },
    categories: transformedItemsAndCategories.categories,
    items: transformedItemsAndCategories.items,
  };

  res.json(transformedData);
});

app.get("/api/items/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log("/api/items/:id - ", id);

  const itemData = await fetch(`${process.env.URL_MELI}/items/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response); // 2. reject instead of throw
    })
    .catch((error) => {
      res.status(error.status).send(`${error.statusText} not found`);
      next(error.statusText);
      return;
    });

  if (!itemData) {
    return;
  }

  const descriptionData = await fetch(
    `${process.env.URL_MELI}/items/${id}/description`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response); // 2. reject instead of throw
    })
    .catch((error) => {
      res.status(error.status).send(`${error.statusText} not found`);
      next(error.statusText);
      return;
    });

  const transformedData = {
    author: {
      name: "Mariana",
      lastname: "Mendivil",
    },
    item: getTransformedItem(itemData, descriptionData),
  };

  res.json(transformedData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
