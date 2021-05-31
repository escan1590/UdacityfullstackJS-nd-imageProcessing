import express from "express";
const mainRoute = express.Router();

mainRoute.get("/", (req, res) => {
  res.json({
    message:
      "Enter your image name with width and height as params the image must be in /assets/full folder",
  });
});

export default mainRoute;
