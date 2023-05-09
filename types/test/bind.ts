import type { Equal, Expect } from '@type-challenges/utils'

import { _, bind } from '../bind'

const add = (num: number, str: string, bol: boolean): string => num + str + bol

const case0 = bind(add, _, 'hello', true)
type Expected0 = (num: number) => string

const case1 = bind(add, _, _, true)
type Expected1 = (num: number, str: string) => string

const case2 = bind(add, _, _, _)
type Expected2 = (num: number, str: string, bol: boolean) => string

const case3 = bind(add, 111, _, true)
type Expected3 = (str: string) => string

const case4 = bind(add, 111, 'hello', _)
type Expected4 = (bol: boolean) => string

const case5 = bind(add, 111, 'hello', false)
type Expected5 = () => string

///@ts-expect-error
const case6 = bind(add, '111', 'hello', true)

///@ts-expect-error
const case7 = bind(add, 111)

///@ts-expect-error
const case8 = bind(add, _, 111)

type cases = [
  Expect<Equal<typeof case0, Expected0>>,
  Expect<Equal<typeof case1, Expected1>>,
  Expect<Equal<typeof case2, Expected2>>,
  Expect<Equal<typeof case3, Expected3>>,
  Expect<Equal<typeof case4, Expected4>>,
  Expect<Equal<typeof case5, Expected5>>,
]