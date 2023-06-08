import { DataGen, Locales, Random, User, downloadData } from '@/model';
import { makeAutoObservable } from 'mobx';

const dataCount = 20;

class UsersData {
  constructor() {
    makeAutoObservable(this);
    this.refresh();
  }

  private rng = new Random();
  private dataGen = new DataGen(this.rng);

  locale = Locales.EN;
  seed: string | undefined;
  mistakesCount = 0;
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

  downloadData() {
    downloadData(this.data);
  }

  refresh() {
    this.dataGen.setSeed(this.seed);
    this.data = this.dataGen.generateUsers(this.mistakesCount, dataCount);
  }

  fetchMore() {
    this.data = this.data.concat(
      this.dataGen.generateUsers(this.mistakesCount, dataCount),
    );
  }
}

export const usersDataStore = new UsersData();
