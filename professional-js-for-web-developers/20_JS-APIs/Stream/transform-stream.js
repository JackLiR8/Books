async function* ints() {
  // yield an incremented integer every 1000ms
  for (let i = 0; i < 5; ++i) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}

const { writable, readable } = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk * 2);
  },
});

const readableStreamDefaultReader = readable.getReader();
const writableStreamDefaultWriter = writable.getWriter();

// Consumer
(async function () {
  while (true) {
    const { done, value } = await readableStreamDefaultReader.read();
    if (done) {
      break;
    } else {
      console.log(value);
    }
  }
})();

// Producer
(async function () {
  for await (let chunk of ints()) {
    await writableStreamDefaultWriter.ready;
    writableStreamDefaultWriter.write(chunk);
  }

  writableStreamDefaultWriter.close();
})();
