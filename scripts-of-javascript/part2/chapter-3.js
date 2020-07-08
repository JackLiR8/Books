/**
 * @file
 * 1. storing functions
 * 2. self-memoizing
 */

// ================= storing functions ================ 
let store = {
  next: 1,
  cache: {},
  add(fn) {
    if (!fn.id) {
      fn.id = this.next++
      this.cache[fn.id] = fn
      return true
    }
  }
}

function ninja() {}
console.log(store.add(ninja))   // true
console.log(store.add(ninja))   // undefined

// ================== self-memoizing ====================
/**
 * 判断一个数是否是“素数”
 * @param {number} value 
 */
function isPrime(value) {
  if (!isPrime.answers) {
    isPrime.answers = {}
  }

  // 有缓存则直接返回缓存
  if (isPrime.answers[value] !== undefined) {
    console.log('has catch')
    return isPrime.answers[value]
  }

  let prime = value !== 1   // 1 不是 prime
  for (let i = 2; i < value; i++) {
    if (value % i === 0) {
      prime = false
      break
    }
  }
  return isPrime.answers[value] = prime
}

isPrime(1319)
console.time('test cache')
console.assert(isPrime(1319), 'not prime')
console.timeEnd('test cache')
