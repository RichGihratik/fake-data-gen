import { alea } from 'seedrandom';
import { type IRandom, type Item } from './types';

// From https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
export function strToNumberSeed(seed?: string): number | undefined {
  if (seed === undefined) return undefined;
  let hash = 0,
    chr;
  if (seed.length === 0) return hash;
  for (let i = 0; i < seed.length; i++) {
    chr = seed.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

export class Random implements IRandom {
  private rng = alea();

  setSeed(seed?: string) {
    this.rng = alea(seed);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectRandomItem<T extends string | any[]>(
    col: T,
    backOffset = 0,
  ): [number, Item<T>] {
    const index = Math.abs(this.rng.int32()) % (col.length - backOffset);
    return [index, col[index]];
  }

  randomRound(count: number): number {
    const rand = this.rng.double();
    const whole = Math.trunc(count);
    const fraction = Math.abs(count - whole);
    return rand > fraction ? whole : whole + 1;
  }
}
