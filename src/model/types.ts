export enum UserField {
  Uuid = 'uuid',
  FullName = 'fullName',
  Address = 'address',
  Email = 'email'
}

export enum Locales {
  EN = 'eng',
  RU = 'rus',
  DE = 'deu'
}

export interface User {
  [UserField.Uuid]: string;
  [UserField.FullName]: string;
  [UserField.Address]: string;
  [UserField.Email]: string;
}

export type Item<T extends string | unknown[]> = T extends string
  ? string
  : T extends Array<infer Type>
  ? Type
  : never;

export interface IRandom {
  setSeed(seed: string | undefined): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectRandomItem<T extends string | any[]>(col: T, backOffset?: number): [number, Item<T>];
  randomRound(num: number): number;
}

export interface IMistaker {

}
