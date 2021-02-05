/**
 * @file ReadableStream
 * 
 * 语法
 * ```js
 * var readableStream = new ReadableStream(underlyingSource[, queueingStrategy]);
 * 
 * underlyingSource
 *    - start(controller)
 *    - pull(controller)
 *    - cancel(reason)
 *    - type
 *    - autoAllocateChunkSize
 * 
 * queueingStrategy
 *    - highWaterMark 应用背压之前可以包含在内部队列中的块的总数
 *    - size(chunk)
 * 
 * ```
 */

async function *ints() {
  for (let i = 0; i < 5; i++) {
    yield await new Promise(resolve => setTimeout(resolve, 1000, i))
  }
}

const readableStream = new ReadableStream({
  async start(controller) {
    for await (const chunk of ints()) {
      controller.enqueue(chunk)
    }

    controller.close()
  }
})

console.log(readableStream.locked)  // true
const readableStreamDefaultReader = readableStream.getReader()
console.log(readableStream.locked);  // false

(async function() {
  while(true) {
    const { done, value } = await readableStreamDefaultReader.read()

    if (done)
      break
    else
      console.log(value)
  }
})()
