/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

import { pipe } from '../transform'

// ========== pipe and compose==========

import { max, add, mul } from '../math'

const case1 = pipe(max, add, mul)
type Expected1 = (arr: number[]) => number

type cases = [
  Expect<Equal<typeof case1, Expected1>>,
]