import express, { response } from "express";
import {
  resize,
  checkResizedFileDimension,
  fetchImage,
} from "../../utilities/imagehelpers";
import { inputFolder, outputFolder } from "../../utilities/config";
const images = express.Router();

images.get("/", async (req, res) => {
  const { filename, width, height } = req.query;
  try {
    if (Object.keys(req.query).length === 0) {
      res.send(
        "Enter filename, width and height as query parameters to resize your image"
      );
    }
    //Here we check if the query parameter are valid
    const numWidth = Number(width);
    const numHeight = Number(height);
    const strfilename = String(filename);

    // if (
    //   numWidth <= 0 ||
    //   numHeight <= 0 ||
    //   !numWidth ||
    //   !numHeight ||
    //   !strfilename
    // ) {
    //   res.status(400).send("invalid or missing width or/and height,filename");
    //   return false;
    // }

    const fileNameExt = await resize(strfilename, numWidth, numHeight);

    const resized = await checkResizedFileDimension(
      `${filename}-resized`,
      numWidth,
      numHeight
    );

    if (resized) {
      res.status(201).sendFile(`${outputFolder}/${fileNameExt}`);
    }
  } catch (error) {
    console.error(error);
  }
});

export default images;
