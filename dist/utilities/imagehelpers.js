"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResizedFileDimension = exports.resize = exports.fetchImage = exports.checkResizeParams = void 0;
var config_1 = require("./config");
var promises_1 = require("fs/promises");
var promisify = require("util").promisify;
var Jimp = require("jimp");
var sizeOf = promisify(require("image-size"));
/**
 * Check if the width and height are valid
 *
 * @param {string} filename The name of the file to resize
 * @param {number} width The final width of the image.
 * @param {number} height The final height of the image.
 * @param {function} callback The function that is called if the with and height don't meet requirements.
 */
var checkResizeParams = function (filename, width, height, callback) {
    if (filename === void 0) { filename = ""; }
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    //here we do something if heigh and width are missing
    if (width <= 0 || height <= 0 || !width || !height || !filename) {
        callback(400, "invalid or missing width or/and height,filename");
        return false;
    }
    return true;
};
exports.checkResizeParams = checkResizeParams;
/**
 * Return filename with the extension matching an image format.
 *
 * @param {string} filename The file name with no extension.
 * @param {string} src The source folder to look the filename in.
 * @returns {string} Filename with an extension.
 */
var fetchImage = function (filename, src) { return __awaiter(void 0, void 0, void 0, function () {
    var files, file, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, promises_1.readdir(src, { withFileTypes: true })];
            case 1:
                files = _a.sent();
                file = files.find(function (el) { return el.name.includes(filename) && el.name.match(/\.(jpe?g|png|gif)$/); });
                if (!file)
                    throw new Error("No such file");
                return [2 /*return*/, file.name];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.fetchImage = fetchImage;
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
var resize = function (filename, width, height, quality) {
    if (quality === void 0) { quality = 100; }
    return __awaiter(void 0, void 0, void 0, function () {
        var fileName, fileNameResize, image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.fetchImage(filename, config_1.inputFolder)];
                case 1:
                    fileName = _a.sent();
                    fileNameResize = fileName.split(".");
                    fileNameResize = fileNameResize.map(function (el, idx) {
                        if (idx === fileNameResize.length - 2) {
                            return el + "-resized.";
                        }
                        else {
                            return el;
                        }
                    });
                    fileNameResize = fileNameResize.join("");
                    return [4 /*yield*/, Jimp.read(config_1.inputFolder + "/" + fileName)];
                case 2:
                    image = _a.sent();
                    return [4 /*yield*/, image.resize(width, height)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, image.quality(quality)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, image.writeAsync(config_1.outputFolder + "/" + fileNameResize)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, fileNameResize];
            }
        });
    });
};
exports.resize = resize;
/**
 * Return a boolean that indicate wether or not the operation was successful.
 *
 * @param {string} filename The file name with no extension.
 * @param {number} width The width we want the final image to have.
 * @param {number} height The height we want the final image to have.
 * @returns {boolean} true if the file meet the dimensions at the end; false if not.
 */
var checkResizedFileDimension = function (filename, width, height) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, dimensions, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.fetchImage(filename, config_1.outputFolder)];
            case 1:
                fileName = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, sizeOf(config_1.outputFolder + "/" + fileName)];
            case 3:
                dimensions = _a.sent();
                if ((dimensions === null || dimensions === void 0 ? void 0 : dimensions.width) === width && (dimensions === null || dimensions === void 0 ? void 0 : dimensions.height) === height) {
                    return [2 /*return*/, true];
                }
                throw new Error("Not expected dimensions");
            case 4:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, true];
        }
    });
}); };
exports.checkResizedFileDimension = checkResizedFileDimension;
