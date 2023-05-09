/**
 * `Parameter` and `ReturnType` can not be used on original typescript `Function`
*/
type Fn = (...args: any[]) => any

/** This is just a placeholder used for `bind()` */
export const _: { _P: 1 };

type $_ = typeof _;

type ProcessParams<OriParams extends any[], Params extends any[], Result extends unknown[] = []> =
  Params extends [...infer Remaining, infer Last]
  ? Last extends $_
  ? ProcessParams<OriParams, Remaining, [[0, ...OriParams][Params['length']], ...Result]> // `0` is a placeholder for index.
  : ProcessParams<OriParams, Remaining, Result>
  : Result

type PlaceHoldAbleParams<Params extends any[], Result extends unknown[] = []> =
  Params extends [infer First, ...infer Remaining]
  ? [...Result, First | $_, ...PlaceHoldAbleParams<Remaining>]
  : Result

export const bind: <F extends Fn, P extends PlaceHoldAbleParams<Parameters<F>>>(
  func: F,
  ...args: P
) => (...args: ProcessParams<Parameters<F>, P>) => ReturnType<F>
