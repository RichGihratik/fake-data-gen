import { type IRandom } from './types';

const nums = '0123456789';

export class Mistaker {
  private alphas = 'abcdefghigklmnopqrstuvwxyz';

  constructor(private rng: IRandom) {}

  setAlpha(alpha: string) {
    this.alphas = alpha;
  }

  addChar(str: string): string {
    const char = this.rng.selectRandomItem(this.alphas + nums)[1];
    const place = this.rng.selectRandomItem(str, -1)[0];
    const arr = [...str];
    arr.splice(place, 0, char);
    return arr.join('');
  }

  removeChar(str: string): string {
    const place = this.rng.selectRandomItem(str)[0];
    const arr = [...str];
    arr.splice(place, 1);
    return arr.join('');
  }

  swapChars(str: string): string {
    const place = this.rng.selectRandomItem(str, 1)[0];
    const swapped = [...str.substring(place, place + 2)].reverse().join('');
    const arr = [...str];
    arr.splice(place, 2, swapped);
    return arr.join('');
  }

  randomMistake(str: string): string {
    const funcs = [
      () => this.addChar(str),
      () => this.removeChar(str),
      () => this.swapChars(str),
    ];

    return this.rng.selectRandomItem(funcs)[1]();
  }
}
