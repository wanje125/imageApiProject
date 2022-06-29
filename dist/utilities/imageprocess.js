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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readData = void 0;
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const readData = (image, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const myFile = yield fs_1.promises.readFile(`resources/images/${image}.jpg`);
    yield (0, sharp_1.default)(myFile)
        .resize(width, height)
        .toFile(`resources/thumbs/${image}.jpg`);
    const check = yield fs_2.default.existsSync(`resources/thumbs/${image}.jpg`);
    yield console.log(check);
});
exports.readData = readData;
