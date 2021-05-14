"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var index_1 = __importDefault(require("./routes/index"));
var app = express_1.default();
var port = 3000;
app.use(morgan_1.default("common"));
app.use(helmet_1.default());
app.use("/api", index_1.default);
app.listen(port, function () {
    console.log("server running on http://localhost:" + 3000 + "/api");
});
