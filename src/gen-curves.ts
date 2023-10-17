export function genLine(
  from: number,
  to: number,
  count: number,
  polynomial: (x: number) => number,
) {
  const step = (to - from) / count;
  return Array.from({ length: count }, (_, i) => ({
    time: from + i * step,
    value: polynomial(from + i * step),
  }));
}

export function polynomial1(
  a: number = -3,
  b: number = 29,
  c: number = -39,
  d: number = 36,
) {
  // console.log(`${a}x^3/2 + ${b}x^2/2 + ${c}x + ${d}`)
  return (x: number) => (a * x ** 3) / 2 + (b * x ** 2) / 2 + c * x + d;
}

export function randomFromTo(from: number, to: number) {
  return Math.random() * (to - from) + from;
}
