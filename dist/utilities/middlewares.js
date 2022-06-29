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
exports.checkImage2 = exports.changeSize = exports.checkImage1 = exports.makeDir = exports.errorFinder = void 0;
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
const imageprocess_1 = require("./imageprocess");
//middleware함수는 next가 필수다.
// finding error if req.query.image doesn't exists throw error
const errorFinder = (req, res, next) => {
    if (req.query.image) {
        next();
    }
    else {
        res.send('There is a wrong image name. So please check urls.');
    }
};
exports.errorFinder = errorFinder;
// making thumbs folder for resized image
const makeDir = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.rm('./resources/thumbs', { recursive: true });
    }
    catch (_a) {
        yield next();
    }
    finally {
        yield fs_1.promises.mkdir('./resources/thumbs');
        yield console.log('thumbs folder build');
        yield next();
    }
});
exports.makeDir = makeDir;
// check image in the imagess folder
const checkImage1 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.image;
    const check = yield fs_2.default.existsSync(`resources/images/${image}.jpg`);
    if (check) {
        yield next();
    }
    else {
        res.send('There is a wrong image name. So please check urls.');
    }
});
exports.checkImage1 = checkImage1;
// resize the image and save in thumbs folder
const changeSize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.image;
    const width = Number(req.query.width) || 200;
    const height = Number(req.query.height) || 200;
    const check = yield fs_2.default.existsSync(`resources/thumbs/${image}-${height}-${width}.jpg`);
    if (check) {
        yield next();
    }
    else {
        yield (0, imageprocess_1.readData)(image, width || 200, height || 200);
        yield next();
    }
});
exports.changeSize = changeSize;
// check this image is created in the thumbs folder
const checkImage2 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.image;
    const width = Number(req.query.width) || 200;
    const height = Number(req.query.height) || 200;
    const check = yield fs_2.default.existsSync(`resources/thumbs/${image}-${height}-${width}.jpg`);
    if (check) {
        yield next();
    }
    else {
        res.send('There is a wrong image name. So please check urls.');
    }
});
exports.checkImage2 = checkImage2;
