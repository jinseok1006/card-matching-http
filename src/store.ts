import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

export const DIFFICULTY = ['easy', 'normal', 'hard'] as const;
const FILE_PATH = './ranks.json';

export interface Rank {
  name: string;
  sec: number;
}
export interface Store {
  easy: Rank[];
  normal: Rank[];
  hard: Rank[];
}

export function readStoreFromFile(): Store {
  const payload = readFileSync(FILE_PATH, 'utf-8');
  const store = JSON.parse(payload) as Store;

  return store;
}

export async function writeStoreToFile(store: Store) {
  try {
    const payload = JSON.stringify(store);
    writeFile(FILE_PATH, payload);
  } catch (err) {
    throw err;
  }
}
