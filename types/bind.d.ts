/**
 * `Parameter` and `ReturnType` can not be used on original typescript `Function`
*/
type Fn = (...args: any[]) => any

/** This is just a placeholder used for `bind()` */
export const _: { _P: 1 };

type $_ = typeof _;

type ProcessParams<OriParams extends any[], Params extends any[]> =
  Params extends [...infer Remaining, infer Last]
  ? Last extends $_
  ? [...ProcessParams<OriParams, Remaining>, [0, ...OriParams][Params['length']]] // `0` is a placeholder for index.
  : ProcessParams<OriParams, Remaining>
  : []

type PlaceholdAbleParams<Params extends any[]> =
  Params extends [infer First, ...infer Remaining]
  ? [First | $_, ...PlaceholdAbleParams<Remaining>]
  : []

export const bind: <F extends Fn, P extends PlaceholdAbleParams<Parameters<F>>>(
  func: F,
  ...args: P
) => (...args: ProcessParams<Parameters<F>, P>) => ReturnType<F>
