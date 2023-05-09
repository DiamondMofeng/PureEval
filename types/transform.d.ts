import type { CurryWarpper } from "./curry";

/**
 * `Parameter` and `ReturnType` can not be used on original typescript `Function`
*/
type Fn = (...args: any[]) => any

export const call: CurryWarpper<
  <Fn extends (...args: any[]) => any>(fun: (...args: Parameters<Fn>) => ReturnType<Fn>, args: Parameters<Fn>) => any
>;

type PipeableArray<Funcs extends Fn[], Prev = () => any> =
  Funcs extends [infer First, ...infer Remaining extends Fn[]]
  ? [
    Prev extends (...args: any[]) => infer R ?
    First extends (...args: infer A) => any ?
    A[0] extends R ? First
    : (arg: R) => any // this is what the type of `First` shoule be.
    : (arg: R) => any
    : never
    ,
    ...PipeableArray<Remaining, First>
  ]
  : [];

export const pipe: <Funcs extends Fn[]>(
  ...funcs:
    PipeableArray<Funcs> extends Funcs
    ? Funcs                 // the given funcs is okay to use.
    : PipeableArray<Funcs>  // use this to get the correct type hints.
) =>
  Funcs extends [] ? () => void :
  Funcs extends [infer First extends Fn, ...infer _, infer Last extends Fn] ? (...args: Parameters<First>) => ReturnType<Last> :
  Funcs extends [infer First] ? First :
  never



