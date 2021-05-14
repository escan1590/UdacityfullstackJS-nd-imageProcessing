import express from "express";
const mainRoute = express.Router();

mainRoute.get("/", (req, res) => {
  res.json({
    message: "hello world of apis",
  });
});

export default mainRoute;
