export function contains<T extends string>(
  list: ReadonlyArray<T>,
  value: string
): value is T {
  return list.some((item) => item === value);
}

export const dateToString = (date: Date) => {
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds()
  );
};
