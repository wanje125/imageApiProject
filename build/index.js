"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const myFunc = (num) => {
    return num * num;
};
exports.default = myFunc;
//routes
app.get('/', (req, res) => {
    res.send('This is home');
});
app.listen(port, () => {
    console.log(`server started at http://localhost::${port}`);
});
