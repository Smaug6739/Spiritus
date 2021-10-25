export function calcLevel(exp: number) {
  return Math.floor(Math.sqrt(exp) * 0.1) + 1;
}

export function calcNeededExpForNextLevel(exp: number) {
  const nextLevel = calcLevel(exp) + 1;
  return calcNeededExpForLevel(nextLevel);
}
export function calcNeededExpForLevel(level: number) {
  const e = Math.pow((level - 1) / 0.1, 2);
  return e;
}
export function progress(a: number, b: number): number {
  return (a / b) * 100;
}
/*.log(calcNeededExpForLevel(1));
console.log(calcNeededExpForLevel(2));
console.log(calcNeededExpForLevel(3));
console.log(calcNeededExpForLevel(4));
console.log(calcNeededExpForLevel(5));*/
console.log(calcLevel(100));
console.log(calcNeededExpForLevel(2));
console.log(progress(100, 400));
