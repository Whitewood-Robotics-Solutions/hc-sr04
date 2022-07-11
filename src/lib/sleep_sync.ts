export function sleepSync(millsecs: number) {
  const start = Date.now();
  let now = start;
  while (now - start < millsecs) {
    now = Date.now();
  }
}
