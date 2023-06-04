import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

export const DIFFICULTY = ['easy', 'normal', 'hard'] as const;
const FILE_PATH = './ranks.json';

// TODO: add Date
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
  // 프로그램 시작시에는 동기로 읽고 서버 열기
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

export function binarySearchInsert(arr: Rank[], data: Rank) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid].sec === data.sec) {
      arr.splice(mid + 1, 0, data);
      return;
    } else if (data.sec > arr[mid].sec) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  arr.splice(low, 0, data);
}
