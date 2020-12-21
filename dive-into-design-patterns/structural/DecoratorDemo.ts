export interface DataSource {
  writeData(data: string): void
  readData(): string
}

// concrete component
class FileDataSource implements DataSource {
  private data: string = ''

  writeData(data: string) {
    this.data = data
  }

  readData() {
    return this.data
  }
}

class BaseDecorator implements DataSource {
  protected wrapee: DataSource

  constructor(component: DataSource) {
    this.wrapee = component
  }

  writeData(data: string) {
    this.wrapee.writeData(data)
  }

  readData() {
    return this.wrapee.readData()
  }
}

class Encrypt extends BaseDecorator {
  writeData(data: string) {
    const encrypted = data
      .split('')
      .map(num => `${Number(num) > 8 ? 0 : Number(num) + 1}`)
      .join('')
    super.writeData(encrypted)
  }

  readData() {
    const decrypted = super.readData()
      .split('')
      .map(num => `${Number(num) < 1 ? 9 : Number(num) - 1}`)
      .join('')
    return decrypted
  }
}

class Compress extends BaseDecorator {
  writeData(data: string) {
    super.writeData(data.slice(4))
  }

  readData() {
    return `0100${super.readData()}`
  }
}


const a = '01001234'
const b = '01006789'

let source: DataSource = new FileDataSource()
let encryptSource: DataSource = new Encrypt(source)

encryptSource.writeData(a)
console.log('encrypted', source.readData())
console.log(encryptSource.readData())


let compressEncryptSource: DataSource = new Compress(encryptSource)
compressEncryptSource.writeData(b)
console.log('encrypted - compressed', source.readData())
console.log(compressEncryptSource.readData())