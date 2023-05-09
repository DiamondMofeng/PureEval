/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

import { compose, pipe } from '../transform'

// ========== pipe and compose==========

import { max, add, mul } from '../math'

const case0_0 = pipe()
const case0_1 = compose()
type Expected0 = () => void

const case1_0 = pipe(max, add, mul)
const case1_1 = compose(mul, add, max)
type Expected1 = (arr: number[]) => number

type cases = [
  Expect<Equal<typeof case0_0, Expected0>>,
  Expect<Equal<typeof case0_1, Expected0>>,

  Expect<Equal<typeof case1_0, Expected1>>,
  Expect<Equal<typeof case1_1, Expected1>>,

]