type Curring<OriFn extends Function, Params extends unknown[], ReturnType, ExpectedParams extends unknown[] = []> =
  Params extends [infer Next, ...infer Remaining]
  ? {
    (...args: [...ExpectedParams, Next]): CurriedReturnType<OriFn, Remaining, ReturnType>
  } & (
    Remaining extends []
    ? {}
    : Curring<OriFn, Remaining, ReturnType, [...ExpectedParams, Next]>
  )
  : ReturnType

type CurriedReturnType<OriFn extends Function, T extends unknown[], ReturnType> =
  T extends []
  ? ReturnType
  : { (): CurriedReturnType<OriFn, T, ReturnType> } & Curring<OriFn, T, ReturnType> & { origin: OriFn }

export type CurryWarpper<Fn extends Function> =
  Fn extends ((...args: infer Params) => infer ReturnType)
  ? CurriedReturnType<Fn, Params, ReturnType>
  : never

export function curry<Fn extends Function>(func: Fn): CurryWarpper<Fn>

export function uncurry<
  CurriedFn extends Function & { origin: Function },
>(func: CurriedFn): CurriedFn['origin'];