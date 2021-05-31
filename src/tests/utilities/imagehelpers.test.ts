import {
  resize,
  checkResizedFileDimension,
  fetchImage,
} from "../../utilities/imagehelpers";
import { inputFolder, outputFolder } from "../../utilities/config";

describe("image helpers function results", () => {
  const fileName = "gunTest";
  const width = 200;
  const height = 200;

  describe("resize function", () => {
    it("should return gunTest-resized.jpg", async () => {
      const fileNameExt = await resize(fileName, width, height);
      expect(fileNameExt).toBe("gunTest-resized.jpg");
    });
  });

  describe("fetch Image function", () => {
    it("should return gunTest.jpg from full folder", async () => {
      const fileNameExt = await fetchImage(fileName, inputFolder);
      expect(fileNameExt).toEqual("gunTest.jpg");
    });

    it("should return gunTest-resized.jpg from thumb folder", async () => {
      const fileNameExt = await fetchImage(fileName, outputFolder);
      expect(fileNameExt).toEqual("gunTest-resized.jpg");
    });
  });

  describe("check resized function", () => {
    it("should return true", async () => {
      const resized = await checkResizedFileDimension(fileName, width, height);
      expect(resized).toBeTrue();
    });
  });
});
