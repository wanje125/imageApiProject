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
exports.checkImage = exports.changeSize = exports.makeDir = exports.errorFinder = void 0;
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
const imageprocess_1 = require("./imageprocess");
//middleware함수는 next가 필수다.
const errorFinder = (req, res, next) => {
    if (req.query.image) {
        next();
    }
    else {
        res.send('There is a wrong image name. So please check urls.');
        throw new Error('image name is missing');
    }
};
exports.errorFinder = errorFinder;
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
const changeSize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.image;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    yield (0, imageprocess_1.readData)(image, width || 200, height || 200);
    yield next();
});
exports.changeSize = changeSize;
const checkImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.image;
    try {
        yield fs_2.default.existsSync(`resources/thumbs/${image}.jpg`);
        yield next();
    }
    catch (_b) {
        res.send('There is a wrong image name. So please check urls.');
        throw new Error('image name is wrong');
    }
});
exports.checkImage = checkImage;
