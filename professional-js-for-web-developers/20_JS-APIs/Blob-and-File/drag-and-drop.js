
const container = document.getElementById('drop-container')
const outputEle = document.getElementById('output')

const REGEX_TEXT = /^text\/(\w*)/
const REGEX_IMG = /^image\/(\w*)/

function preventDefault(e) {
  e.preventDefault()
}

async function handleDrop(e) {
  e.preventDefault()
  const files = e.dataTransfer.files
  if (files.length < 1) return
  let fragment = document.createDocumentFragment()
  await Promise.all([...files].map(file => read(file, fragment)))
  outputEle.appendChild(fragment)
}

function read(file, fragment) {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    if (REGEX_TEXT.test(file.type)/* text */) {
      reader.readAsText(file)
      reader.onload = function() {
        const div = document.createElement('div')
        div.innerText = `${reader.result}`
        fragment.appendChild(div)
        resolve()
      }
  
    } else if (REGEX_IMG.test(file.type)/* image */) {
      reader.readAsDataURL(file)
      reader.onload = function() {
        const img = new Image(200, 200)
        img.src = reader.result
        fragment.appendChild(img)
        resolve()
      }
    }

    reader.onerror = function() {
      reject('code' + reader.error.code)
    }
  })
}

container.addEventListener('dragenter', preventDefault)
container.addEventListener('dragover', preventDefault)
container.addEventListener('drop', handleDrop)

