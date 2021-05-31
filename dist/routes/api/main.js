"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mainRoute = express_1.default.Router();
mainRoute.get("/", function (req, res) {
    res.json({
        message: "Enter your image name with width and height as params the image must be in /assets/full folder",
    });
});
exports.default = mainRoute;
