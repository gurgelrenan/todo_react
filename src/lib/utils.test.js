import {partial, pipe} from './utils'

const add = (a, b) => a + b
const addThree = (a, b, c) => a + b + c
const inc = (num) => num + 1
const db1 = (num) => num * 2

test('partial applies the first argument ahead of time', () => {
  const inc = partial(add, 1)
  const result = inc(2) // expect 3

  expect(result).toBe(3)
})

test('partial applies the multiple arguments ahead of time', () => {
  const inc = partial(addThree, 1, 3)
  const result = inc(2) // expect 6

  expect(result).toBe(6)
})

test('pipe passes the results of inc to db1', () => {
  const pipeline = pipe(inc, db1) // => db1(inc(2)) OR g(f(...args))
  const result = pipeline(2)

  expect(result).toBe(6)
})

test('pipe passes the results of db1 to inc', () => {
  const pipeline = pipe(db1, inc) // => inc(db1(2))
  const result = pipeline(2)

  expect(result).toBe(5)
})

test('pipe works with more than 2 functions', () => {
  const pipeline = pipe(add, inc, db1, inc)
  const result = pipeline(1, 2)

  expect(result).toBe(9)
})
