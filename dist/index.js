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
app.get('/api/images', middlewares_1.errorFinder, middlewares_1.makeDir, middlewares_1.changeSize, middlewares_1.checkImage, (req, res) => {
    const image = req.query.image;
    const imagepath = path_1.default.join(__dirname, `../resources/thumbs/${image}.jpg`);
    res.sendFile(imagepath);
});
app.listen(port, () => {
    console.log(`server started at http://localhost::${port}`);
});
exports.default = app;
