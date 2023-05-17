import path from 'path';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

interface rank {
  name: string;
  sec: number;
}

const store: rank[] = [
  {
    name: 'jinseok',
    sec: 30,
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.json(store);
});

app.post('/register', (req: express.Request, res: express.Response) => {
  try {
    store.push(req.body as rank);
    store.sort((a, b) => a.sec - b.sec);
    console.log(store);
    res.send('true');
  } catch (e) {
    res.send('false');
  }
});

app.listen(port, () => {
  console.log(`server is listening...`);
});
