
/* ====================================================== */
/*                      BULK ENCODING                     */
/* ====================================================== */

const encoder = new TextEncoder()
const emoji = '😊'
const encodedEmoji = encoder.encode(emoji)
console.log('emoji encoding:',encodedEmoji)
// Unit8Array(4) [240, 159, 152, 138]

const decoder = new TextDecoder()
const decodedEmoji = decoder.decode(encodedEmoji)
console.log('emoji decoded:', decodedEmoji)


/* ====================================================== */
/*                     STREAM ENCODING                    */
/* ====================================================== */
async function *chars() {
  const text = 'foo'
  for (const char of text) {
    yield await new Promise(resolve => setTimeout(resolve, 1000, char))
  }
}

// --- generate stream
const decodedTextStream = new ReadableStream({
  async start(controller) {
    for await (let chunk of chars()) {
      controller.enqueue(chunk)
    }

    controller.close()
  }
})

const encodedTextStream = decodedTextStream.pipeThrough(new TextEncoderStream())

const readableStreamDefaultReader = encodedTextStream.getReader()
!(async function() {
  while(true) {
    const { done, value } = await readableStreamDefaultReader.read()

    if (done) break
    else console.log(value)
  }
})()
// Uint8Array[102]
// Uint8Array[111]
// Uint8Array[111]


