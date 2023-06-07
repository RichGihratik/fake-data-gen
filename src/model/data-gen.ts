import { type IRandom, type User, Locales, UserField } from './types';
import { Mistaker } from './mistakes';
import { strToNumberSeed } from './random';

import { faker as de } from '@faker-js/faker/locale/de';
import { faker as en } from '@faker-js/faker/locale/en';
import { faker as ru } from '@faker-js/faker/locale/ru';

const deAlpha = 'abcdefghijklmnopqrstuvwxyzäöüß';
const ruAlpha = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const enAlpha = 'abcdefghijklmnopqrstuvwxyz';

const map = {
  [Locales.RU]: {
    faker: ru,
    alpha: ruAlpha + ruAlpha.toLocaleUpperCase(),
  },
  [Locales.EN]: {
    faker: en,
    alpha: enAlpha + enAlpha.toLocaleUpperCase(),
  },
  [Locales.DE]: {
    faker: de,
    alpha: deAlpha + deAlpha.toLocaleUpperCase(),
  },
} as const;

const mistakeFields = [
  UserField.Address, 
  UserField.Email, 
  UserField.FullName
];

export class DataGen {
  private mistaker: Mistaker;

  constructor(private rng: IRandom) {
    this.mistaker = new Mistaker(rng);
    this.mistaker.setAlpha(this.alpha);
  }

  private locale = Locales.EN;

  private get faker() {
    return map[this.locale].faker;
  }

  private get alpha() {
    return map[this.locale].alpha;
  }

  setLocale(locale: Locales) {
    this.locale = locale;
    this.mistaker.setAlpha(this.alpha);
  }

  setSeed(seed?: string) {
    this.faker.seed(strToNumberSeed(seed));
    this.rng.setSeed(seed);
  }

  generateUsers(mistakes = 0, count = 1): User[] {
    const result = new Array(count).map(() => ({
      uuid: this.faker.string.uuid(),
      email: this.faker.internet.email(),
      fullName: this.faker.person.fullName(),
      address: this.faker.location.streetAddress({ useFullAddress: true }),
    }));

    const rounded = this.rng.randomRound(mistakes); 

    result.forEach(user => {
      for (let i = 0; i < rounded; i++) {
        this.makeMistake(user);
      }
    });

    return result;
  }

  private makeMistake(user: User) {
    const field = this.rng.selectRandomItem(mistakeFields)[1];
    user[field] = this.mistaker.randomMistake(user[field]);
  }
}
