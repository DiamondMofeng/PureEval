import type { CurryWarpper } from "./curry";

/**
 * `Parameter` and `ReturnType` can not be used on original typescript `Function`
*/
type Fn = (...args: any[]) => any

type Pipeable<Funcs extends Fn[], Prev extends Fn = () => any> =
  Funcs extends [infer First extends Fn, ...infer Remaining extends Fn[]]
  ? [
    ReturnType<Prev> extends Parameters<First>[0]
    ? First
    : (arg: ReturnType<Prev>) => any
    ,
    ...Pipeable<Remaining, First>
  ]
  : [];

export const pipe: <Funcs extends Fn[]>(
  ...funcs:
    Pipeable<Funcs> extends Funcs
    ? Funcs                 // the given funcs is okay to use.
    : Pipeable<Funcs>       // use this to get the correct type hints.
) =>
  Funcs extends [] ? () => void :
  Funcs extends [infer First extends Fn, ...infer _, infer Last extends Fn] ? (...args: Parameters<First>) => ReturnType<Last> :
  Funcs extends [infer First] ? First :
  never;

// the reverse version of `Pipeable`
type Composeable<Funcs extends Fn[], Prev extends Fn = () => any> =
  Funcs extends [...infer Remaining extends Fn[], infer Last extends Fn]
  ? [
    ...Composeable<Remaining, Last>
    ,
    ReturnType<Prev> extends Parameters<Last>[0]
    ? Last
    : (arg: ReturnType<Prev>) => any
  ]
  : [];

export const compose: <Funcs extends Fn[]>(
  ...funcs:
    Composeable<Funcs> extends Funcs
    ? Funcs                 // the given funcs is okay to use.
    : Composeable<Funcs>  // use this to get the correct type hints.
) =>
  Funcs extends [] ? () => void :
  Funcs extends [infer First extends Fn, ...infer _, infer Last extends Fn] ? (...args: Parameters<Last>) => ReturnType<First> :
  Funcs extends [infer Last] ? Last :
  never;

export const call: CurryWarpper<
  <Func extends Fn>(fun: (...args: Parameters<Func>) => ReturnType<Func>, args: Parameters<Func>) => any
>;
