"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const middlewares_1 = require("./utilities/middlewares");
const app = (0, express_1.default)();
const port = 3000;
//routes*/
app.get('/api/images', middlewares_1.errorFinder, middlewares_1.checkImage1, middlewares_1.changeSize, middlewares_1.checkImage2, (req, res) => {
    const image = req.query.image;
    const width = Number(req.query.width) || 200;
    const height = Number(req.query.height) || 200;
    const imagepath = path_1.default.join(__dirname, `../resources/thumbs/${image}-${height}-${width}.jpg`);
    res.sendFile(imagepath);
});
app.listen(port, () => {
    console.log(`server started at http://localhost::${port}`);
});
exports.default = app;
