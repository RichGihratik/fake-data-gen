import { alea } from 'seedrandom';
import { type IRandom, type Item } from './types';

// From https://github.com/davidbau/seedrandom/blob/4460ad325a0a15273a211e509f03ae0beb99511a/lib/alea.js#L78
export function strToNumberSeed(seed?: string): number | undefined {
  if (seed === undefined) return undefined;
  let n = 0xefc8249d;
  for (let i = 0; i < seed.length; i++) {
    n += seed.charCodeAt(i);
    let h = 0.02519603282416938 * n;
    n = h >>> 0;
    h -= n;
    h *= n;
    n = h >>> 0;
    h -= n;
    n += h * 0x100000000; // 2^32
  }
  return n >>> 0;
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
