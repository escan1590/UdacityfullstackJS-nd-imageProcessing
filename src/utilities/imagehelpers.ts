import { inputFolder, outputFolder } from "./config";
import { readdir } from "fs/promises";
const { promisify } = require("util");
const Jimp = require("jimp");
const sizeOf = promisify(require("image-size"));

/**
 * Return filename with the extension matching an image format.
 *
 * @param {string} filename The file name with no extension.
 * @param {string} src The source folder to look the filename in.
 * @returns {string} Filename with an extension.
 */
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

/**
 * Return the name of the resized file if the operation succeed.
 * Throw an error if not.
 *
 * @param {string} filename The file name with no extension.
 * @param {number} width The width we want the final image to have.
 * @param {number} height The height we want the final image to have.
 * @param {number} quality The quality we want the final file to have default at 100.
 * @returns {string} The name of the final file.
 */
export const resize = async (
  filename: string,
  width: number,
  height: number,
  quality = 100
): Promise<string | void> => {
  const fileName = await fetchImage(filename, inputFolder);
  //Here we add resized to the name of resized file.
  let fileNameResize: string | string[] = fileName.split(".");
  fileNameResize = fileNameResize.map((el, idx) => {
    if (idx === fileNameResize.length - 2) {
      return `${el}-resized.`;
    } else {
      return el;
    }
  });
  fileNameResize = fileNameResize.join("");
  //---//

  const image = await Jimp.read(`${inputFolder}/${fileName}`);
  await image.resize(width, height);
  await image.quality(quality);
  await image.writeAsync(`${outputFolder}/${fileNameResize}`);
  return fileNameResize;
};

/**
 * Return a boolean that indicate wether or not the operation was successful.
 *
 * @param {string} filename The file name with no extension.
 * @param {number} width The width we want the final image to have.
 * @param {number} height The height we want the final image to have.
 * @returns {boolean} true if the file meet the dimensions at the end; false if not.
 */
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
