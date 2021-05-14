"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mainRoute = express_1.default.Router();
mainRoute.get("/", function (req, res) {
    res.json({
        message: "hello world of apis",
    });
});
exports.default = mainRoute;
