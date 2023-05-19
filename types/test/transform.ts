/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

import { compose, pipe } from '../transform'

// ========== pipe and compose==========

import { max, add, mul } from '../math'

const case0_0 = pipe()
const case0_1 = compose()
type Expected0 = () => void

const case1_0 = pipe(max, add(1), mul(2))
const case1_1 = compose(mul(1), add(1), max)
type Expected1 = (arr: number[]) => number

// TODO fix this
//      see https://github.com/microsoft/TypeScript/issues/54223
//      Ts have issue when infering parameters from overloaded function.
//      So current solution have some limitations.

/// @ts-expect-error
const case2_0 = pipe(max, add, mul)
/// @ts-expect-error
const case2_1 = compose(mul, add, max)

type Parent = { name: string }
type Child = { name: string, age: number }

const getChildAge = (child: Child) => child.age
const genParent = (): Parent => ({ name: 'foo' })

const case3_0 = pipe(
  genParent,
  ///@ts-expect-error
  getChildAge,
)

const case3_1 = compose(
  ///@ts-expect-error
  getChildAge,
  genParent,
)

type _cases = [
  Expect<Equal<typeof case0_0, Expected0>>,
  Expect<Equal<typeof case0_1, Expected0>>,

  Expect<Equal<typeof case1_0, Expected1>>,
  Expect<Equal<typeof case1_1, Expected1>>,
]