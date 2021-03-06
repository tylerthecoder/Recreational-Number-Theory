import { digits } from "./number";
import { rf, tail } from "./utils";

const isInSeq = (build: (seq: number[]) => any, seed: number[]) =>
  rf((call, x, seq = seed) => {
    const index = seq.indexOf(x);
    if (index > -1) {
      return index;
    }
    if (tail(seq) > x) {
      return false;
    }
    seq.push(build(seq));
    return call(x, seq);
  });

const fib = (seed: number[]) => tail(seed, 1) + tail(seed, 2);
const padovan = (seed: number[]) => tail(seed, 2) + tail(seed, 3);
const jacobsthal = (seed: number[]) => tail(seed, 1) + 2 * tail(seed, 2);
const leonardo = (seed: number[]) => tail(seed, 1) + tail(seed, 2) + 1;
const catalan = (seed: number[]) => ((4 * (seed.length - 1) + 2) / (seed.length + 1)) * tail(seed, 1);
const lazyCaterers = (seed: number[]) => {
  const i = Math.sqrt(2 * tail(seed) - 7 / 4) - 0.5;
  return ((i + 1) ** 2 + (i + 1) + 2) / 2;
};
const lookAndSay = (seed: number[]) => {
  const res = digits(tail(seed)).reduce(
    (accum, val) => {
      accum.str += accum.last !== val ? String(accum.count) + String(accum.last) : "";
      accum.count = accum.last === val ? accum.count + 1 : 1;
      accum.last = val;
      return accum;
    },
    { str: "", count: 0, last: digits(tail(seed))[0] },
  );
  return Number(res.str + res.count + res.last);
};

export const inFib = isInSeq(fib, [0, 1]);
export const inLucas = isInSeq(fib, [2, 1]);
export const inPadovan = isInSeq(padovan, [1, 1, 1]);
export const inJacobsthal = isInSeq(jacobsthal, [0, 1]);
export const inLeonardo = isInSeq(leonardo, [1, 1]);
export const inCatalan = isInSeq(catalan, [1, 1]);
export const inLookAndSay = isInSeq(lookAndSay, [1]);
export const inLazyCaterers = isInSeq(lazyCaterers, [1]);
