
/* ====================================================== */
/*                     STREAM DECODING                    */
/* ====================================================== */

async function *chars() {
  // Each chunk must exist as a typed array
  // const text = /* foo */[102, 111, 111].map(x => Uint8Array.of(x))
  const text = /* 😊 */[240, 159, 152, 138].map(x => Uint8Array.of(x))
  
  for (const char of text) {
    yield await new Promise(resolve => setTimeout(resolve, 1000, char))
  }
}

// --- generate stream
const encodedTextStream = new ReadableStream({
  async start(controller) {
    for await (let chunk of chars()) {
      controller.enqueue(chunk)
    }

    controller.close()
  }
})

const decodedTextStream = encodedTextStream.pipeThrough(new TextDecoderStream())

const readableStreamDefaultReader = decodedTextStream.getReader()
!(async function() {
  while(true) {
    const { done, value } = await readableStreamDefaultReader.read()

    if (done) break
    else console.log(value)
  }
})()
// f
// o
// o