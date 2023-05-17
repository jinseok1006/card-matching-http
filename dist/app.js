"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const store = [
    {
        name: 'jinseok',
        sec: 30,
    },
];
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json(store);
});
app.post('/register', (req, res) => {
    try {
        store.push(req.body);
        store.sort((a, b) => a.sec - b.sec);
        console.log(store);
        res.send('true');
    }
    catch (e) {
        res.send('false');
    }
});
app.listen(port, () => {
    console.log(`server is listening...`);
});
