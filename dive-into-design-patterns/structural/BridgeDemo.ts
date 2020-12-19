export const name = 'BridgeDemo'

// implemention
interface Operation {
  start(): string
  UI(): string
  fs(): string
}

// concrete implementions
class Windows implements Operation {
  start() {
    return `windows system starting way`
  }

  UI() {
    return `windows style UI`
  }

  fs() {
    return `windows file system`
  }
}

class MacOs implements Operation {
  start() {
    return `mac os starting`
  }

  UI() {
    return `buautiful mac-os style UI`
  }

  fs() {
    return `mac-os file system: {finder}`
  }
}


// abstraction
class App {
  private os: Operation

  constructor(os: Operation) {
    this.os = os
  }

  start() {
    this.os.start()
  }

  findFile() {
    console.log(`find file through ${this.os.fs()}`)
  }

  getOuterlook() {
    console.log(`the outerlook is ${this.os.UI()}`)
  }
}

function clientCode(os: Operation) {
  const app = new App(os)
  app.start()
  app.findFile()
  app.getOuterlook()
}

let os = new Windows()
clientCode(os)
console.log('')
os = new MacOs()
clientCode(os)
