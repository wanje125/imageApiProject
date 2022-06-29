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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images');
        expect(response.text).toBe('There is a wrong image name. So please check urls.');
    }));
});
describe('Test query string', () => {
    it('if there is a correct query string', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?image=image');
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('image/jpeg');
    }));
    it('if there is a wrong query string', () => __awaiter(void 0, void 0, void 0, function* () {
        const nothing = 'nothing';
        const response = yield fs_1.default.existsSync(`resources/thumbs/${nothing}.jpg`);
        expect(response).toBeFalsy();
    }));
});
describe('Test resize image', () => {
    it('if the width and height of image really changed in the thumbs folder', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?image=image');
        const ori_image_path = path_1.default.join(__dirname, '../../resources/images/image.jpg');
        const image = fs_1.default.statSync(ori_image_path);
        const image_path = path_1.default.join(__dirname, '../../resources/thumbs/image.jpg');
        const thumb = fs_1.default.statSync(image_path);
        expect(image.size).not.toBe(thumb.size);
    }));
});
