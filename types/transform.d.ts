import type { CurryWarpper } from "./curry";

/**
 * `Parameter` and `ReturnType` can not be used on original typescript `Function`
*/
type Fn = (...args: any[]) => any

type Pipeable<Funcs extends Fn[], Prev = () => any> =
  Funcs extends [infer First, ...infer Remaining extends Fn[]]
  ? [
    Prev extends (...args: any[]) => infer R ?
    First extends (...args: infer A) => any ?
    A[0] extends R ? First
    : (arg: R) => any // this is what the type of `First` shoule be.
    : (arg: R) => any
    : never
    ,
    ...Pipeable<Remaining, First>
  ]
  : [];

export const pipe: <Funcs extends Fn[]>(
  ...funcs:
    Pipeable<Funcs> extends Funcs
    ? Funcs                 // the given funcs is okay to use.
    : Pipeable<Funcs>  // use this to get the correct type hints.
) =>
  Funcs extends [] ? () => void :
  Funcs extends [infer First extends Fn, ...infer _, infer Last extends Fn] ? (...args: Parameters<First>) => ReturnType<Last> :
  Funcs extends [infer First] ? First :
  never;

/**
 * Reverse the given tuple.
 */
type Reverse<T extends any[], R extends any[] = []> =
  T extends [infer First, ...infer Remaining]
  ? Reverse<Remaining, [First, ...R]>
  : R

export const compose: <Funcs extends Fn[]>(
  ...funcs:
    Pipeable<Reverse<Funcs>> extends Reverse<Funcs>
    ? Reverse<Funcs>                 // the given funcs is okay to use.
    : Pipeable<Reverse<Funcs>>  // use this to get the correct type hints.
) =>
  Reverse<Funcs> extends [] ? () => void :
  Reverse<Funcs> extends [infer First extends Fn, ...infer _, infer Last extends Fn] ? (...args: Parameters<First>) => ReturnType<Last> :
  Reverse<Funcs> extends [infer First] ? First :
  never;

export const call: CurryWarpper<
  <Func extends Fn>(fun: (...args: Parameters<Func>) => ReturnType<Func>, args: Parameters<Func>) => any
>;

