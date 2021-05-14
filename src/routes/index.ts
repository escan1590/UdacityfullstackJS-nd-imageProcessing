import express from "express";
import images from "./api/image";
import mainRoute from "./api/main";
const router = express.Router();

router.use("/", mainRoute);
router.use("/images", images);

export default router;
