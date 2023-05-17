import path from 'path';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

interface rank {
  name: string;
  sec: number;
}

const store = {
  easy: [] as rank[],
  normal: [] as rank[],
  hard: [] as rank[],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.json(store);
});

app.get('/get/:diff', (req: express.Request, res: express.Response) => {
  const diff = req.params.diff as string;

  // 외부 함수를 통한 type guard가 불가능...
  if (!(diff === 'easy' || diff === 'normal' || diff === 'hard'))
    return void res.send(false);

  res.send(store[diff]);
});

app.get('/register/:diff', (req: express.Request, res: express.Response) => {
  const diff = req.params.diff;
  if (!(diff === 'easy' || diff === 'normal' || diff === 'hard'))
    return void res.send(false);

  if (!req.query) return void res.send(false);
  if (typeof req.query.name !== 'string' || typeof req.query.sec !== 'string')
    return void res.send(false);

  const rank = {
    name: req.query.name,
    sec: parseInt(req.query.sec),
  };

  store[diff].push(rank);
  store[diff].sort((a, b) => a.sec - b.sec);

  console.log(store[diff]);

  res.send(true);
});

app.get('/reset', (req: express.Request, res: express.Response) => {
  store.easy.splice(0);
  store.normal.splice(0);
  store.hard.splice(0);

  res.send(true);
});

app.listen(port, () => {
  console.log(`server is listening...`);
});
