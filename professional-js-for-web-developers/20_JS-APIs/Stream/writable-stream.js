/**
 * @file WriteableStream
 * 
 *  * 语法
 * ```js
 * var readableStream = new ReadableStream(underlyingSource[, queueingStrategy]);
 * 
 * underlyingSource
 *    - start(controller)
 *    - write(chunk, controller)
 *    - close(controller)
 *    - abort(reason)
 * 
 * queueingStrategy
 *    - highWaterMark 应用背压之前可以包含在内部队列中的块的总数
 *    - size(chunk)
 */

async function *ints() {
  for (const s of 'hello') {
    yield await new Promise(resolve => setTimeout(resolve, 1000, s))
  }
}

const writeableStream = new WritableStream({
  write(value) {
    console.log(value)
  },
  close() {
    console.log('close')
  }
})

console.log(writeableStream.locked)   // false
const writableStreamDefaultWriter = writeableStream.getWriter()
console.log(writeableStream.locked);   // true

(async () => {
  for await (const chunk of ints()) {
    // Before writing values to the stream, the producer 
    // must ensure the writer is capable of accepting values. 
    // WritableStreamDefaultWriter.ready returns a promise that
    // resolves when the writer is ready 
    await writableStreamDefaultWriter.ready
    writableStreamDefaultWriter.write(chunk)
  }

  writableStreamDefaultWriter.close()
})()
