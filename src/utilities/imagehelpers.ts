import { inputFolder, outputFolder } from "./config";
import { readdir } from "fs/promises";
const { promisify } = require("util");
const Jimp = require("jimp");
const sizeOf = promisify(require("image-size"));

export const fetchImage = async (
  filename: string,
  src: string
): Promise<string> => {
  let files = await readdir(src, { withFileTypes: true });
  let file = files.find(
    (el) => el.name.includes(filename) && el.name.match(/\.(jpe?g|png|gif)$/)
  );
  if (!file) throw new Error("No such file");
  return file.name;
};

export const resize = async (
  filename: string,
  width: number,
  height: number,
  quality = 100
): Promise<string | void> => {
  const fileName = await fetchImage(filename, inputFolder);
  let fileNameResize: string | string[] = fileName.split(".");
  fileNameResize = fileNameResize.map((el, idx) => {
    if (idx === fileNameResize.length - 2) {
      return `${el}-resized.`;
    } else {
      return el;
    }
  });
  fileNameResize = fileNameResize.join("");
  const image = await Jimp.read(`${inputFolder}/${fileName}`);
  await image.resize(width, height);
  await image.quality(quality);
  await image.writeAsync(`${outputFolder}/${fileNameResize}`);
  return fileNameResize;
};

export const checkResizedFileDimension = async (
  filename: string,
  width: number,
  height: number
): Promise<boolean> => {
  const fileName = await fetchImage(filename, outputFolder);
  try {
    const dimensions = await sizeOf(`${outputFolder}/${fileName}`);
    if (dimensions?.width === width && dimensions?.height === height) {
      return true;
    }
    throw new Error("Not expected dimensions");
  } catch (err) {
    console.error(err);
  }
  return true;
};
