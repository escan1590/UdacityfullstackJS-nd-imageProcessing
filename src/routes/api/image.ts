import express, { response } from "express";
import {
  resize,
  checkResizedFileDimension,
} from "../../utilities/imagehelpers";
import { outputFolder } from "../../utilities/config";
const images = express.Router();

images.get("/", async (req, res) => {
  const { filename, width, height } = req.query;
  try {
    if (!filename || !height || !width) {
      res.send({
        message:
          "enter fileName with and height as query parameters to resize your image",
      });
      throw new Error("No parameters entered");
    }

    const fileNameExt = await resize(
      String(filename),
      Number(width),
      Number(height)
    );

    const resized = await checkResizedFileDimension(
      `${filename}-resized`,
      Number(width),
      Number(height)
    );

    if (resized) {
      res.sendFile(`${outputFolder}/${fileNameExt}`);
    }
  } catch (error) {
    console.error(error);
  }
});

export default images;
