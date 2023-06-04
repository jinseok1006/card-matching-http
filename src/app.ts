import express from 'express';
import type { Request, Response } from 'express';
import helmet from 'helmet';

import { contains } from './util';
import {
  DIFFICULTY,
  binarySearchInsert,
  readStoreFromFile,
  writeStoreToFile,
} from './store';
import type { Store, Rank } from './store';

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = readStoreFromFile();

app.get('/', (req: Request, res: Response) => {
  res.json(store);
});

app.get('/get/:diff', (req: Request, res: Response) => {
  const diff = req.params.diff as string;

  if (!contains(DIFFICULTY, diff)) return void res.send(false);

  res.json(store[diff]);
});

app.get('/register/:diff', (req: Request, res: Response) => {
  const diff = req.params.diff as string;

  if (!contains(DIFFICULTY, diff)) return void res.send(false);
  if (!req.query || !req.query.name || !req.query.sec)
    return void res.send(false);

  const name = req.query.name as string;
  const sec = parseFloat(req.query.sec as string);

  const rank = { name, sec };

  binarySearchInsert(store[diff], rank);

  console.log(`ip: ${req.ip}, name: ${name}, sec: ${sec}`);

  res.send(true);
});

app.get('/reset', (req: Request, res: Response) => {
  store.easy.splice(0);
  store.normal.splice(0);
  store.hard.splice(0);

  res.send(true);
});

app.get('/delete/:diff', (req: Request, res: Response) => {
  const diff = req.params.diff as string;

  if (!contains(DIFFICULTY, diff)) return void res.send(false);
  if (!req.query.name) return void res.send(false);

  const name = req.query.name as string;

  store[diff] = store[diff].filter((rank) => name !== rank.name);

  res.send(true);
});

// 1시간 마다 파일에 저장
setInterval(() => writeStoreToFile(store), 1000 * 60 * 60);

app.listen(port, () => {
  console.log(`server is listening...`);
});
