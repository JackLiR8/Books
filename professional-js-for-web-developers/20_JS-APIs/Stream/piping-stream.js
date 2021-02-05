
/* -------------------------- pipeThrough() ------------------------- */
//  pipe a ReadableStream into a TransformStream using the pipeThrough() method.
async function* ints() {
  // yield an incremented integer every 1000ms
  for (let i = 0; i < 5; ++i) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}

const integerStream = new ReadableStream({
  async start(controller) {
    for await (let chunk of ints()) {
      controller.enqueue(chunk);
    }
    controller.close();
  },
});

const doublingStream = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk * 2);
  },
});

// Perform stream piping
const pipedStream = integerStream.pipeThrough(doublingStream);
// Acquire reader on output of piped streams
const pipedStreamDefaultReader = pipedStream.getReader();
// Consumer
(async function () {
  while (true) {
    const { done, value } = await pipedStreamDefaultReader.read();
    if (done) {
      break;
    } else {
      console.log(value);
    }
  }
})();

/* ---------------------------- pipeTo() ---------------------------- */
// pipe a ReadableStream to a WritableStream using the pipeTo() method

// Notice here that the piping operation is implicitly acquiring a reader from 
// the ReadableStream and feeding the produced values into the WritableStream.

const integerStream1 = new ReadableStream({
  async start(controller) {
    for await (let chunk of ints()) {
      controller.enqueue(chunk);
    }
    controller.close();
  },
});

const writableStream = new WritableStream({
  write(value) {
  console.log(value);
  }
 });

 const pipedStream1 = integerStream1.pipeTo(writableStream);
