import express from "express";

export const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to the Word Reference Scrapper API!");
});