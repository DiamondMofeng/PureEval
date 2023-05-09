import { type CurryWarpper} from './curry';

export function odd(x: number): boolean;

export function even(x: number): boolean;

export const add: CurryWarpper<(a: number, b: number) => number>;

export const minus: CurryWarpper<(a: number, b: number) => number>;

export const mul: CurryWarpper<(a: number, b: number) => number>;

export const div: CurryWarpper<(a: number, b: number) => number>;

export const mod: CurryWarpper<(a: number, b: number) => number>;

export const rema: CurryWarpper<(a: number, b: number) => number>;

export const power: CurryWarpper<(a: number, b: number) => number>;

export const negate: (a: number) => number;

export const under: (a: number, b: number) => number;

export const upper: (a: number, b: number) => number;

export const sort: CurryWarpper<<T>(rule: ((a: T, b: T) => number)|undefined|null, arr: T[]) => T[]>;

export const median: (arr: number[]) => number;

export const sum: (arr: number[]) => number;

export const prod: (arr: number[]) => number;

export const max: (arr: number[]) => number;

export const min: (arr: number[]) => number;

export const average: (arr: number[]) => number;

export const inc: (x: number) => number;

export const dec: (x: number) => number;
