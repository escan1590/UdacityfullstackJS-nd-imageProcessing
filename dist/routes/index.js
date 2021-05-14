"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var image_1 = __importDefault(require("./api/image"));
var main_1 = __importDefault(require("./api/main"));
var router = express_1.default.Router();
router.use("/", main_1.default);
router.use("/images", image_1.default);
exports.default = router;
