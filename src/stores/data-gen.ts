import { DataGen, Locales, Random, User } from '@/model';
import { makeAutoObservable } from 'mobx';

const dataCount = 20;

class UsersData {
  constructor() {
    makeAutoObservable(this);
  }

  private rng = new Random();
  private dataGen = new DataGen(this.rng);

  seed: string | undefined;
  mistakesCount: number = 0;
  data: User[] = [];

  setSeed(seed?: string) {
    this.seed = seed;
    this.refresh();
  }

  setLocale(locale: Locales) {
    this.dataGen.setLocale(locale);
    this.refresh();
  }

  setMistakesCount(count: number) {
    this.mistakesCount = count;
    this.refresh();
  }

  refresh() {
    this.dataGen.setSeed(this.seed);
    this.data = this.dataGen.generateUsers(this.mistakesCount, dataCount);
  }

  fetchMore() {
    this.data.concat(this.dataGen.generateUsers(this.mistakesCount, dataCount));
  }
}

export const usersDataStore = new UsersData();
