"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const store = {
    easy: [],
    normal: [],
    hard: [],
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json(store);
});
app.get('/get/:diff', (req, res) => {
    const diff = req.params.diff;
    // 외부 함수를 통한 type guard가 불가능...
    if (!(diff === 'easy' || diff === 'normal' || diff === 'hard'))
        return void res.send(false);
    res.send(store[diff]);
});
app.post('/register/:diff', (req, res) => {
    const diff = req.params.diff;
    if (!(diff === 'easy' || diff === 'normal' || diff === 'hard'))
        return void res.send(false);
    const rank = req.body;
    store[diff].push(rank);
    store[diff].sort();
    res.send(true);
});
app.get('/reset', (req, res) => {
    store.easy.splice(0);
    store.normal.splice(0);
    store.hard.splice(0);
    res.send(true);
});
app.listen(port, () => {
    console.log(`server is listening...`);
});
