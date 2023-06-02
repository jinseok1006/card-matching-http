import express from 'express';
import helmet from 'helmet';
import type { Request, Response } from 'express';

import { contains } from './util';

const app = express();
const port = process.env.PORT || 3000;

interface rank {
  name: string;
  sec: number;
}

const method = ['easy', 'normal', 'hard'] as const;

const store = {
  easy: [] as rank[],
  normal: [] as rank[],
  hard: [] as rank[],
};

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json(store);
});

app.get('/get/:diff', (req: Request, res: Response) => {
  const diff = req.params.diff as string;

  if (!contains(method, diff)) return void res.send(false);

  res.json(store[diff]);
});

app.get('/register/:diff', (req: Request, res: Response) => {
  const diff = req.params.diff as string;

  if (!contains(method, diff)) return void res.send(false);
  if (!req.query || !req.query.name || !req.query.sec)
    return void res.send(false);

  const rank = {
    name: req.query.name as string,
    sec: parseFloat(req.query.sec as string),
  };

  store[diff].push(rank);
  store[diff].sort((a, b) => a.sec - b.sec);

  console.log(`ip: ${req.ip}, rank: ${JSON.stringify(rank)}`);

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

  if (!contains(method, diff)) return void res.send(false);
  if (!req.query.name) return void res.send(false);

  const name = req.query.name as string;

  store[diff] = store[diff].filter((rank, idx) => name !== rank.name);

  res.send(true);
});

app.listen(port, () => {
  console.log(`server is listening...`);
});
